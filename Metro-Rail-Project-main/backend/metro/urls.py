from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import show_test_ticket
from .views import MedicalHelpListCreateView, MedicalHelpDetailView, MedicalHelpSolutionCreateView

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

app_name = 'metro'

urlpatterns += [
    path('ticket/<int:ticket_id>/qr/',
         views.generate_qr_code, name='generate_qr_code'),
    path('test-ticket/', show_test_ticket, name='test_ticket'),
    path('create-ticket/', views.create_ticket, name='create_ticket'),
    path('ticket-qr/<int:ticket_id>/',
         views.generate_ticket_qr, name='generate_ticket_qr'),
    path('tickets/', views.get_user_tickets, name='get_user_tickets'),
    path('tickets/<int:ticket_id>/', views.delete_ticket, name='delete_ticket'),
    path('tickets/<int:ticket_id>/',
         views.get_ticket_details, name='get_ticket_details'),
    path('all-tickets/', views.get_all_tickets, name='get_all_tickets'),
    path('medical-help/', MedicalHelpListCreateView.as_view(),
         name='medical-help-list-create'),
    path('medical-help/<int:pk>/', MedicalHelpDetailView.as_view(),
         name='medical-help-detail'),
    path('medical-help/<int:pk>/solutions/',
         MedicalHelpSolutionCreateView.as_view(), name='medical-help-solution-create'),
]
