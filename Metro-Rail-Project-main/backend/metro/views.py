from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import User, Journey, Payment, LostItem, UserLostReport, Feedback, Complaint, QuizResult
from .serializers import (
    UserSerializer, JourneySerializer, PaymentSerializer,
    LostItemSerializer, UserLostReportSerializer,
    FeedbackSerializer, ComplaintSerializer, QuizResultSerializer
)

from django.db.models import Count, Sum
from django.http import JsonResponse
from .models import User, Journey, Payment
from django.db.models.functions import ExtractYear

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user).data,
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)

class JourneyViewSet(viewsets.ModelViewSet):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Journey.objects.filter(user=self.request.user)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

class LostItemViewSet(viewsets.ModelViewSet):
    queryset = LostItem.objects.all()
    serializer_class = LostItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserLostReportViewSet(viewsets.ModelViewSet):
    queryset = UserLostReport.objects.all()
    serializer_class = UserLostReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserLostReport.objects.filter(user=self.request.user)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(user=self.request.user)
    
class QuizResultViewSet(viewsets.ModelViewSet):
    queryset = QuizResult.objects.all()
    serializer_class = QuizResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Public API for analytics summary
@api_view(['GET'])
@permission_classes([AllowAny])
def public_analytics_summary(request):
    total_users = User.objects.count()
    total_journeys = Journey.objects.count()
    total_payments = Payment.objects.aggregate(total=Sum('amount'))['total'] or 0

    revenue_data = (
        Payment.objects
        .annotate(year=ExtractYear('timestamp'))
        .values('year')
        .annotate(yearly_total=Sum('amount'))
        .order_by('year')
    )

    revenue_by_year = {entry['year']: float(entry['yearly_total']) for entry in revenue_data}

    return JsonResponse({
        "total_users": total_users,
        "total_journeys": total_journeys,
        "total_payments": float(total_payments),
        "revenue_by_year": revenue_by_year
    }) 