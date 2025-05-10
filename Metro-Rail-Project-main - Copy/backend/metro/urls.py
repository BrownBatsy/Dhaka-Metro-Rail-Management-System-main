from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import public_analytics_summary, ServiceAlertViewSet, submit_quiz


router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'journeys', views.JourneyViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'lost-items', views.LostItemViewSet)
router.register(r'lost-reports', views.UserLostReportViewSet)
router.register(r'feedback', views.FeedbackViewSet)
router.register(r'complaints', views.ComplaintViewSet)
router.register(r'quiz-results', views.QuizResultViewSet)
#router.register(r'service-alerts', views.ServiceAlertViewSet)
router.register(r'service-alerts', ServiceAlertViewSet, basename='service-alerts')

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/summary/', public_analytics_summary, name='public-analytics'),
    path("quiz/submit/", submit_quiz, name="submit-quiz"),
    
]