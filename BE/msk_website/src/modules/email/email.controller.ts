import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: MailService) {}

  
}
