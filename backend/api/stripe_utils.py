# stripe_utils.py
import stripe
from django.conf import settings




def create_checkout_session(order):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    BASE_URL = 'http://localhost:5173'
    line_items = []
    for product in order.products.all():
        line_items.append({
            'price_data': {
                'currency': 'zar',
                'product_data': {
                    'name': product.name,
                },
                'unit_amount': int(product.price * 100),
            },
            'quantity': 1,
        })

    session = stripe.checkout.Session.create(
        line_items=line_items,
        mode='payment',
        success_url=f'{BASE_URL}/success',
        cancel_url=f'{BASE_URL}/cancel',
    )

    return session.id