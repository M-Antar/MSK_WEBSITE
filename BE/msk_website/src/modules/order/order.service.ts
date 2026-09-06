import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/models/order/order.schema';
import { OrderFactoryService } from './factory';
import { ProductRepository } from 'src/models';
import { OrderRepository } from 'src/models/order/order.repository';
import { MailService } from '../email/email.service';
import { TelegramService } from '../telegram/telegram.service';
import { getShippingFee } from 'src/common/constant/governorate';


interface VerifiedOrderProduct {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderFactoryService: OrderFactoryService,
    private readonly mailService: MailService,
    private readonly telegramService: TelegramService,

    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const products: VerifiedOrderProduct[] = [];

    for (const item of createOrderDto.products) {
      const product = await this.productRepository.getOne({
        _id: item.productId,
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for "${product.name}". Available stock: ${product.stock}`,
        );
      }

      const price = product.price;
      const totalPrice = price * item.quantity;

      products.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price,
        totalPrice,
      });
    }

    // Generate order number
    const count = await this.orderModel.countDocuments();
    const orderNumber = count + 1;

    // Calculate shipping fee based on governorate
    const shippingFee = getShippingFee(createOrderDto.address.governorate);

    // Calculate subtotal + total (products + delivery fee)
    const subtotal = products.reduce(
      (sum, product) => sum + product.totalPrice,
      0,
    );
    const total = subtotal + shippingFee;

    // Create order
    const order = this.orderFactoryService.createOrder(
      createOrderDto,
      products,
    );

    // Save order
    const savedOrder = await this.orderRepository.create(order);

    // Update product stock
    for (const item of products) {
      await this.productRepository.findOneAndUpdate(
        { _id: item.productId },
        {
          $inc: {
            stock: -item.quantity,
            sold: item.quantity,
          },
        },
      );
    }

    // Send confirmation email without blocking the order
    this.notifyOrderPlaced(
      createOrderDto.email,
      createOrderDto.fullName,
      orderNumber,
      products,
      shippingFee,
      total,
    ).catch((err) => {
      console.error('Failed to send order confirmation email:', err);
    });

    // Send Telegram notification without blocking the order
    this.notifyTelegram(
      createOrderDto,
      orderNumber,
      products,
      shippingFee,
      total,
    ).catch((err) => {
      console.error('Failed to send Telegram notification:', err);
    });

    return savedOrder;
  }

  private async notifyTelegram(
    createOrderDto: CreateOrderDto,
    orderNumber: number,
    products: VerifiedOrderProduct[],
    shippingFee: number,
    total: number,
  ) {
    const productLines = products
      .map((p) => `• ${p.name} × ${p.quantity} — ${p.totalPrice} LE`)
      .join('\n');

    const { fullName, email, address } = createOrderDto;

    const message = `
🛒 <b>New Order #${orderNumber}</b>

👤 <b>Customer:</b> ${fullName}
📧 ${email}
📞 ${address.phoneNumber}

📍 <b>Address:</b>
${address.street}, ${address.city}, ${address.governorate}, ${address.country}

📦 <b>Products:</b>
${productLines}

🚚 Delivery Fee: ${shippingFee} LE
💰 <b>Total: ${total.toFixed(2)} LE</b>
    `.trim();

    await this.telegramService.sendMessage(message);
  }

  async notifyOrderPlaced(
    email: string,
    customerName: string,
    orderNumber: number,
    products: VerifiedOrderProduct[],
    shippingFee: number,
    total: number,
  ) {
    const rows = products
      .map(
        (product) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #333;color:#eee;">
              ${product.name}
            </td>

            <td style="padding:12px 0;border-bottom:1px solid #333;color:#eee;text-align:center;">
              ${product.quantity}
            </td>

            <td style="padding:12px 0;border-bottom:1px solid #333;color:#eee;text-align:right;">
              ${product.price} LE
            </td>
          </tr>
        `,
      )
      .join('');

    const html = `
      <div style="background:#0d0d0d;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
        
        <div style="max-width:480px;margin:0 auto;">
          
          <h1 style="color:#fff;text-align:center;font-size:26px;margin-bottom:4px;">
            Order Confirmed
          </h1>

          <p style="color:#aaa;text-align:center;margin-top:0;">
            Order #${orderNumber}
          </p>

          <div style="background:#1a1a1a;border-radius:12px;padding:24px;margin-top:20px;">
            
            <h2 style="color:#fff;font-size:20px;margin:0 0 12px;">
              Hi ${customerName},
            </h2>

            <p style="color:#ccc;margin:0 0 4px;">
              Your order has been placed successfully.
            </p>

            <p style="color:#fff;font-weight:bold;margin:0 0 16px;">
              Order Number: #${orderNumber}
            </p>

            <table style="width:100%;border-collapse:collapse;">
              
              <thead>
                <tr>
                  <th style="text-align:left;color:#888;border-bottom:1px solid #444;padding-bottom:8px;">
                    Item
                  </th>

                  <th style="text-align:center;color:#888;border-bottom:1px solid #444;padding-bottom:8px;">
                    Qty
                  </th>

                  <th style="text-align:right;color:#888;border-bottom:1px solid #444;padding-bottom:8px;">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                ${rows}
              </tbody>

            </table>

            <p style="color:#ccc;display:flex;justify-content:space-between;margin-top:16px;">
              <span>Delivery Fee</span>
              <span>${shippingFee.toFixed(2)} LE</span>
            </p>

            <p style="color:#fff;font-weight:bold;text-align:right;margin-top:8px;">
              Total: ${total.toFixed(2)} LE
            </p>

          </div>
        </div>
      </div>
    `;

    await this.mailService.sendMail({
      to: email,
      subject: `Order Confirmation - #${orderNumber}`,
      html,
    });
  }
}