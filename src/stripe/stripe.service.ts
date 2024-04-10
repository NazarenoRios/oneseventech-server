import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartItemDTO } from './dto/cart-item.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPayment(
    items: CartItemDTO[],
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    const total = subtotal * 2.37 * 100;

    return await this.stripe.paymentIntents.create({
      amount: Math.round(total),
      currency: 'usd',
    });
  }

  async confirmPayment(
    paymentId: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(
        paymentId,
        {
          payment_method: 'pm_card_visa',
          return_url: 'https://www.oneseventech.com',
        },
      );

      return paymentIntent;
    } catch (error) {
      throw new Error(
        `An error occurred while confirming the payment: ${error.message}`,
      );
    }
  }

  async getPayment(
    paymentId: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.retrieve(paymentId);
  }
}
