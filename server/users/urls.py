# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', UserAPIView.as_view(), name='user'),
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('leaders/', LeadersAPIView.as_view(), name='leaders'),
    path('user/<int:user_id>/', GetUserByIdAPIView.as_view(), name='get_user_by_id'),  # New endpoint for getting user by ID
]
