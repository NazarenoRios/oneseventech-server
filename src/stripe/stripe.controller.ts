import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CartItemDTO } from './dto/cart-item.dto';

@Controller('stripe')
export class StripeController {
  constructor(private paymentService: StripeService) {}

  @Post()
  @HttpCode(201)
  createPayments(@Body() items: CartItemDTO[]) {
    return this.paymentService.createPayment(items);
  }

  @Post('confirm/:paymentId')
  @HttpCode(201)
  confirmPayment(@Param('paymentId') paymentId: string) {
    return this.paymentService.confirmPayment(paymentId);
  }

  @Get(':paymentId')
  @HttpCode(200)
  getPayments(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPayment(paymentId);
  }
}
