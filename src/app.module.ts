import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, StripeController],
  providers: [AppService, StripeService],
})
export class AppModule {}
