import { EntityManager } from '@mikro-orm/core';
import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { uuid } from '../../../../../../../main/src/utils';
import { User } from '../../../entities2/User';
import { sendEmail } from '../../util/email';
import { renderCurrency } from '../../util/pipe';

// https://stripe.com/docs/payments/integration-builder
// https://dashboard.stripe.com/webhooks

const stripe = require('stripe')('sk_test_stplovPQ9e2Og3FX5x7Ge1gx');

const payok = async paymentIntent => {
  console.log('payok', 'paymentIntent', paymentIntent);
  await sendEmail(
    'bernard@kidotech.com',
    `Bethesda Prescription Paid`,
    JSON.stringify(paymentIntent),
  );
  console.log('email sent');
};

const chargeCustomer = async (customerId, amount) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  });
  // Charge the customer and payment method immediately
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'sgd',
    customer: customerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
  });

  if (paymentIntent.status === 'succeeded') {
    console.log('✅ Successfully charged card off session');
  }
};

@Controller('stripe')
export class StripeController {
  constructor(private readonly em: EntityManager) {}

  @Get('')
  @Render('stripe/index')
  async get(@Query('email') email, @Query('amount') amount) {
    const user = await this.em.findOne(User, { email });
    amount = +amount || 50;
    const code = uuid();

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.email,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: 'off_session',
      amount,
      currency: 'sgd',
      payment_method_types: ['card'],
      statement_descriptor: 'Custom descriptor',
      metadata: { code, integration_check: 'accept_a_payment' },
    });
    return {
      code,
      email,
      amount: renderCurrency(amount),
      client_secret: paymentIntent.client_secret,
    };
  }

  @Post('webhook')
  async webhook(@Body() body) {
    console.log('stripe webhook');
    try {
      const event = body;
      console.log(event.type);

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          await payok(paymentIntent);
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          break;
        // ... handle other event types
        default:
          console.log('Unhandled event', event.type);
        // Unexpected event type
        // return response.status(400).end();
      }

      // Return a 200 response to acknowledge receipt of the event
      return { received: true };
    } catch (err) {
      console.log('err', err);
      // response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  }
}
