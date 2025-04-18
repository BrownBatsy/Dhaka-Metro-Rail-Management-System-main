from django.urls import path
from .views import RegisterAPI, LoginAPI, UserAPI
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('user/', UserAPI.as_view(), name='user'),
    path('token/', obtain_auth_token, name='token'),
] 