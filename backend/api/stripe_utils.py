import stripe
from django.conf import settings

stripe.api_key = "settings.STRIPE_SECRET_KEY"


def create_checkout_session(order):
    line_items = []
    for product in order.products.all():
        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": product.name,
                    },
                    "unit_amount": int(
                        product.price * 100
                    ),  # Stripe expects amount in cents
                },
                "quantity": 1,
            }
        )

    session = stripe.checkout.Session.create(
        line_items=line_items,
        mode="payment",
        success_url="https://your-website.com/success",
        cancel_url="https://your-website.com/cancel",
    )

    return session.id
