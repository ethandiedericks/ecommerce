"""
Module: models.py
Author: [Ethan Diedericks]

Description:
This module defines the custom user model for the application.

Classes:
- CustomUser: Represents a custom user model with extended features.

"""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Represents a custom user model with extended features.

    Attributes:
    - email: Email address of the user (unique).
    - first_name: First name of the user.
    - last_name: Last name of the user.
    - is_staff: Boolean indicating if the user is a staff member.
    - is_active: Boolean indicating if the user account is active.
    - date_joined: Timestamp indicating when the user account was created.
    - last_login: Timestamp indicating the last login time of the user.
    """

    email = models.EmailField(_("Email Address"), unique=True)
    first_name = models.CharField(_("First Name"), max_length=50)
    last_name = models.CharField(_("Last Name"), max_length=50)
    is_staff = models.BooleanField(_("Staff Status"), default=False)
    is_active = models.BooleanField(_("Active"), default=True)
    date_joined = models.DateTimeField(_("Date Joined"), default=timezone.now)
    last_login = models.DateTimeField(_("Last Login"), blank=True, null=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
    
    def __str__(self) -> str:
        """
        String representation of the user.

        Returns:
        - Email address of the user.
        """
        return self.email
