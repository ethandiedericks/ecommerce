import paypalrestsdk
from paypalrestsdk import Payment
from django.conf import settings

paypalrestsdk.configure(
    {
        "mode": "sandbox",  # Set to "live" for production
        "client_id": settings.PAYPAL_CLIENT_ID,
        "client_secret": settings.PAYPAL_CLIENT_SECRET,
    }
)

DOMAIN = "http://localhost:5173/"


def create_paypal_payment(order):
    payment = Payment(
        {
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url":"http://localhost:5173/checkout/success/",
                "cancel_url":"http://localhost:5173/checkout/cancel/",
            },
            "transactions": [
                {
                    "item_list": {
                        "items": [
                            {
                                "name": "Order",
                                "sku": str(order.id),
                                "price": str(order.total_price),
                                "currency": "USD",
                                "quantity": 1,
                            }
                        ]
                    },
                    "amount": {"total": str(order.total_price), "currency": "USD"},
                    "description": "Payment for your order.",
                }
            ],
        }
    )

    if payment.create():
        print("Payment created successfully")
        return payment["redirect_urls"]["return_url"]
    else:
        print("Error creating payment:")
        print(payment.error)
        return None
