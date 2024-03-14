from django.db.models.signals import post_migrate
from django.apps import apps
from django.dispatch import receiver

from .models import Category


@receiver(post_migrate)
def create_initial_categories(sender, **kwargs):
    if sender.name == "api" and kwargs.get("app_config").name == "api":
        if not Category.objects.exists():
            categories = [
                "Automotive & DIY",
                "Baby & Toddler",
                "Beauty",
                "Books and Courses",
                "Camping & Outdoor",
                "Clothing, Shoes & Accessories",
                "Electronics",
                "Gaming & Media",
                "Garden, Pool & Patio",
                "Groceries & Household",
                "Health & Personal Care",
                "Home & Appliances",
                "Liquor",
                "Office & Stationery",
                "Pets",
                "Sports & Training",
                "Toys",
            ]
            for category_name in categories:
                Category.objects.create(name=category_name)
