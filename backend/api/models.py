from django.db import models
from django.db.models import Avg
from django.utils.text import slugify
from django.contrib.auth import get_user_model


class Category(models.Model):
    """
    Represents a category for grouping products.

    Attributes:
    - name: Name of the category.
    - slug: Unique slug generated from the name.
    """

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        """
        Custom save method to generate slug from the name.
        """
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Represents a product available for purchase.

    Attributes:
    - name: Name of the product.
    - description: Description of the product.
    - price: Price of the product.
    - category: Category to which the product belongs.
    - stock_level: Current stock level of the product.
    - image: Image representing the product.
    """

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    stock_level = models.IntegerField(default=0)
    image = models.ImageField(upload_to="product_images/")

    def __str__(self):
        return self.name


class Order(models.Model):
    """
    Represents an order placed by a user.

    Attributes:
    - user: User who placed the order.
    - products: Many-to-many relationship with products.
    - total_price: Total price of the order.
    - shipping_address: Shipping address for the order.
    - billing_address: Billing address for the order.
    - status: Current status of the order.
    - created_at: Timestamp indicating when the order was created.
    """

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.ForeignKey(
        "Address", related_name="shipping_address", on_delete=models.CASCADE
    )
    billing_address = models.ForeignKey(
        "Address", related_name="billing_address", on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("shipped", "Shipped"),
            ("delivered", "Delivered"),
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Checkout(models.Model):
    """
    Represents the checkout process for an order.

    Attributes:
    - order: Order being checked out.
    - amount: Total amount to be paid for the order.
    - payment_method: Method of payment for the order.
    - transaction_id: Unique identifier for the transaction.
    """

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100)


class Review(models.Model):
    """
    Represents a review submitted by a user for a product.

    Attributes:
    - user: User who submitted the review.
    - product: Product being reviewed.
    - rating: Rating given by the user for the product.
    - text: Additional text content of the review.
    - created_at: Timestamp indicating when the review was submitted.
    """

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def get_average_rating(cls, product_id):
        """
        Class method to calculate the average rating for a product.

        Parameters:
        - product_id: ID of the product.

        Returns:
        - Average rating for the product.
        """
        return cls.objects.filter(product_id=product_id).aggregate(Avg("rating"))[
            "rating__avg"
        ]


class Cart(models.Model):
    """
    Represents a user's shopping cart containing selected products.

    Attributes:
    - user: User who owns the cart.
    - product: Product added to the cart.
    - quantity: Quantity of the product in the cart.
    - created_at: Timestamp indicating when the cart item was created.
    - updated_at: Timestamp indicating when the cart item was last updated.
    """

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "product")

    @property
    def total_price(self):
        """
        Calculates the total price of the cart item.

        Returns:
        - Total price of the cart item.
        """
        return self.quantity * self.product.price


class Address(models.Model):
    """
    Represents a user's address information.

    Attributes:
    - user: User to whom the address belongs.
    - street_address: Street address.
    - city: City.
    - state: State.
    - country: Country.
    - zip_code: ZIP code.
    """

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)


class Refund(models.Model):
    """
    Represents a refund requested by a user for an order.

    Attributes:
    - user: User who requested the refund.
    - order: Order for which the refund is requested.
    - refund_amount: Amount to be refunded.
    - reason: Reason for the refund.
    - status: Current status of the refund.
    """

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    refund_amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ("requested", "Requested"),
            ("processing", "Processing"),
            ("completed", "Completed"),
        ],
    )
