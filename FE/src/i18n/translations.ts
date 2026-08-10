/**
 * UI copy dictionary for the storefront.
 *
 * NOTE: only static interface text lives here. Product / category names and
 * descriptions come from the NestJS API — see src/services/product.service.ts.
 * Recommended backend contract: accept a `lang` query param (`?lang=ar`) on the
 * product endpoints and return localised `name` / `description` fields.
 */
export const languages = ["en", "ar"] as const;
export type Language = (typeof languages)[number];

export const translations = {
  en: {
    // Navbar / Footer
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.cart": "Cart",
    "nav.cartAria": "Cart, {count} items",
    "lang.switchTo": "Switch to Arabic",
    "footer.blurb":
      "A small, considered catalogue of everyday essentials. Made well, priced fairly, shipped quickly.",
    "footer.quickLinks": "Quick links",
    "footer.contact": "Contact",
    "footer.address": "28 Alder Street, Portland, OR",
    "footer.rights": "© {year} MSK. All rights reserved.",

    // Home
    "home.heroTitle": "Everyday essentials, carefully chosen.",
    "home.heroText":
      "A short, honest catalogue instead of an endless aisle. Two categories, considered materials, and prices that make sense.",
    "home.shopNow": "Shop Now",
    "home.eyebrow": "About the store",
    "home.introTitle": "Small catalogue, high standards.",
    "home.introText":
      "MSK is an independent shop built around a simple idea: fewer products, better made. We work directly with a handful of makers, keep our range tight, and restock only what earns its place.",
    "home.feature1Title": "Fast shipping",
    "home.feature1Text": "Orders leave the workshop within 24 hours, with tracking on every parcel.",
    "home.feature2Title": "Quality products",
    "home.feature2Text": "Every item is checked by hand and backed by a two-year guarantee.",
    "home.feature3Title": "Support",
    "home.feature3Text": "Real people answering real questions, seven days a week.",

    // Products (categories)
    "products.title": "Browse the collection",
    "products.subtitle":
      "Two categories, each kept deliberately small. Pick one to see what is in stock.",
    "products.loading": "Loading categories…",
    "products.errorTitle": "Couldn't load categories",
    "products.emptyTitle": "No categories yet",
    "products.emptyMessage": "Categories will appear here as soon as they are published.",
    "products.viewProducts": "View Products",

    // Category
    "category.allCategories": "← All categories",
    "category.loading": "Loading products…",
    "category.errorTitle": "Couldn't load products",
    "category.emptyTitle": "No products in this category",
    "category.emptyMessage": "Check back soon — this category is being restocked.",
    "category.back": "Back to categories",
    "category.viewDetails": "View Details",
    "category.quickAdd": "Quick Add",

    // Product details
    "product.loading": "Loading product…",
    "product.errorTitle": "Couldn't load this product",
    "product.sizes": "Available sizes",
    "product.quantity": "Quantity",
    "product.addToCart": "Add To Cart",
    "product.goToCart": "Go to cart",
    "product.added": "Added to your cart.",
    "product.relatedTitle": "Related products",
    "product.relatedLoading": "Loading related products…",
    "product.relatedError": "Related products unavailable",
    "product.relatedEmpty": "Nothing related yet",
    "product.oneSize": "One size",

    // Cart
    "cart.title": "Your cart",
    "cart.emptyTitle": "Your cart is empty",
    "cart.emptyMessage": "Once you add products they will show up here.",
    "cart.continueShopping": "Continue Shopping",
    "cart.size": "Size",
    "cart.remove": "Remove",
    "cart.total": "Total",
    "cart.checkout": "Checkout",

    // Checkout
    "checkout.backToCart": "← Back to cart",
    "checkout.title": "Checkout",
    "checkout.customerInfo": "Customer information",
    "checkout.fullName": "Full name",
    "checkout.email": "Email",
    "checkout.phone": "Phone",
    "checkout.address": "Address",
    "checkout.summary": "Order summary",
    "checkout.emptyCart": "Your cart is empty.",
    "checkout.browseProducts": "Browse products",
    "checkout.placing": "Placing order…",
    "checkout.placeOrder": "Place Order",
    "checkout.orderPlaced": "Order {id} placed — {status}.",

    // Shared
    "common.tryAgain": "Try again",
  },

  ar: {
    // Navbar / Footer
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.cart": "السلة",
    "nav.cartAria": "السلة، {count} عنصر",
    "lang.switchTo": "التحويل إلى الإنجليزية",
    "footer.blurb":
      "مجموعة صغيرة ومختارة بعناية من أساسيات الحياة اليومية. مصنوعة بجودة، بأسعار عادلة، وشحن سريع.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "تواصل معنا",
    "footer.address": "٢٨ شارع ألدر، بورتلاند، أوريغون",
    "footer.rights": "© {year} مارين. جميع الحقوق محفوظة.",

    // Home
    "home.heroTitle": "أساسيات يومية مختارة بعناية.",
    "home.heroText":
      "قائمة قصيرة وصادقة بدلاً من رفوف لا تنتهي. فئتان فقط، ومواد مدروسة، وأسعار منطقية.",
    "home.shopNow": "تسوّق الآن",
    "home.eyebrow": "عن المتجر",
    "home.introTitle": "تشكيلة صغيرة ومعايير عالية.",
    "home.introText":
      "مارين متجر مستقل قام على فكرة بسيطة: منتجات أقل بجودة أفضل. نعمل مباشرة مع عدد محدود من الصنّاع، ونحافظ على تشكيلة مركّزة، ولا نعيد توفير إلا ما يستحق مكانه.",
    "home.feature1Title": "شحن سريع",
    "home.feature1Text": "تخرج الطلبات من الورشة خلال ٢٤ ساعة مع تتبّع لكل شحنة.",
    "home.feature2Title": "منتجات عالية الجودة",
    "home.feature2Text": "كل منتج يُفحص يدويًا ومدعوم بضمان لمدة عامين.",
    "home.feature3Title": "دعم العملاء",
    "home.feature3Text": "فريق حقيقي يجيب على أسئلتك طوال أيام الأسبوع.",

    // Products (categories)
    "products.title": "استعرض التشكيلة",
    "products.subtitle": "فئتان فقط، كل منهما صغيرة بشكل مقصود. اختر واحدة لرؤية المتوفر.",
    "products.loading": "جارٍ تحميل الفئات…",
    "products.errorTitle": "تعذّر تحميل الفئات",
    "products.emptyTitle": "لا توجد فئات بعد",
    "products.emptyMessage": "ستظهر الفئات هنا بمجرد نشرها.",
    "products.viewProducts": "عرض المنتجات",

    // Category
    "category.allCategories": "→ كل الفئات",
    "category.loading": "جارٍ تحميل المنتجات…",
    "category.errorTitle": "تعذّر تحميل المنتجات",
    "category.emptyTitle": "لا توجد منتجات في هذه الفئة",
    "category.emptyMessage": "عد قريبًا — يتم إعادة توفير هذه الفئة.",
    "category.back": "العودة إلى الفئات",
    "category.viewDetails": "عرض التفاصيل",
    "category.quickAdd": "إضافة سريعة",

    // Product details
    "product.loading": "جارٍ تحميل المنتج…",
    "product.errorTitle": "تعذّر تحميل هذا المنتج",
    "product.sizes": "المقاسات المتوفرة",
    "product.quantity": "الكمية",
    "product.addToCart": "أضف إلى السلة",
    "product.goToCart": "الانتقال إلى السلة",
    "product.added": "تمت الإضافة إلى سلتك.",
    "product.relatedTitle": "منتجات ذات صلة",
    "product.relatedLoading": "جارٍ تحميل المنتجات المشابهة…",
    "product.relatedError": "المنتجات المشابهة غير متوفرة",
    "product.relatedEmpty": "لا توجد منتجات مشابهة بعد",
    "product.oneSize": "مقاس واحد",

    // Cart
    "cart.title": "سلة التسوق",
    "cart.emptyTitle": "سلتك فارغة",
    "cart.emptyMessage": "بمجرد إضافة منتجات ستظهر هنا.",
    "cart.continueShopping": "مواصلة التسوق",
    "cart.size": "المقاس",
    "cart.remove": "إزالة",
    "cart.total": "الإجمالي",
    "cart.checkout": "إتمام الشراء",

    // Checkout
    "checkout.backToCart": "→ العودة إلى السلة",
    "checkout.title": "إتمام الشراء",
    "checkout.customerInfo": "بيانات العميل",
    "checkout.fullName": "الاسم الكامل",
    "checkout.email": "البريد الإلكتروني",
    "checkout.phone": "رقم الهاتف",
    "checkout.address": "العنوان",
    "checkout.summary": "ملخص الطلب",
    "checkout.emptyCart": "سلتك فارغة.",
    "checkout.browseProducts": "تصفّح المنتجات",
    "checkout.placing": "جارٍ إرسال الطلب…",
    "checkout.placeOrder": "تأكيد الطلب",
    "checkout.orderPlaced": "تم إنشاء الطلب {id} — {status}.",

    // Shared
    "common.tryAgain": "حاول مرة أخرى",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
