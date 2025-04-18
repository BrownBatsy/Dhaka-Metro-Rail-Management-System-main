from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'journeys', views.JourneyViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'lost-items', views.LostItemViewSet)
router.register(r'lost-reports', views.UserLostReportViewSet)
router.register(r'feedback', views.FeedbackViewSet)
router.register(r'complaints', views.ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
