from django.urls import path
from .views import CartView

urlpatterns = [
    path('', CartView.as_view()),
    path("cart/", CartView.as_view(), name="cart"),
    path("item/<int:pk>/", CartView.as_view(), name="update-cart-item"),
    path("item/<int:pk>/delete/", CartView.as_view(), name="remove-cart-item"),
]
