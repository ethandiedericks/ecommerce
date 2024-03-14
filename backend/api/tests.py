from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Category, Product, Cart

User = get_user_model()


class CategoryViewSetTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword",
            first_name="John",
            last_name="Doe",
        )
        cls.category, _ = Category.objects.get_or_create(name="Electronics")
        cls.product = Product.objects.create(
            name="Smartphone", category=cls.category, price=999.99
        )

    def test_list_categories(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("category-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_category(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("category-detail", args=[self.category.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.category.name)


class ProductViewSetTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword",
            first_name="John",
            last_name="Doe",
        )
        cls.category, _ = Category.objects.get_or_create(name="Electronics")
        cls.product = Product.objects.create(name="Smartphone", category=cls.category)

    def test_list_products(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("product-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_product(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("product-detail", args=[self.product.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.product.name)


class CartViewSetTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword",
            first_name="John",
            last_name="Doe",
        )
        cls.category, _ = Category.objects.get_or_create(name="Electronics")
        cls.product = Product.objects.create(name="Smartphone", category=cls.category)

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    def test_add_to_cart(self):
        url = reverse("cart-list")
        data = {"product_id": self.product.pk, "quantity": 1}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cart.objects.count(), 1)
