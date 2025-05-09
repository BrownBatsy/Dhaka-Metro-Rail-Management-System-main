from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import User, Journey, Payment, LostItem, UserLostReport, Feedback, Complaint, Ticket
import qrcode
from io import BytesIO
from .serializers import (
    UserSerializer, JourneySerializer, PaymentSerializer,
    LostItemSerializer, UserLostReportSerializer,
    FeedbackSerializer, ComplaintSerializer
)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import AnonymousUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes
from rest_framework.permissions import AllowAny  # Import AllowAny permission
import base64  # Add this import

from rest_framework import generics, permissions
from .models import MedicalHelp, MedicalHelpSolution
from .serializers import MedicalHelpSerializer, MedicalHelpSolutionSerializer
from rest_framework.permissions import AllowAny


class MedicalHelpListCreateView(generics.ListCreateAPIView):
    queryset = MedicalHelp.objects.all().order_by('-created_at')
    serializer_class = MedicalHelpSerializer
    permission_classes = [AllowAny]  # Allow anyone to access

    def perform_create(self, serializer):
        serializer.save()  # Remove user association


class MedicalHelpDetailView(generics.RetrieveAPIView):
    queryset = MedicalHelp.objects.all()
    serializer_class = MedicalHelpSerializer
    permission_classes = [AllowAny]  # Allow anyone to access


class MedicalHelpSolutionCreateView(generics.CreateAPIView):
    queryset = MedicalHelpSolution.objects.all()
    serializer_class = MedicalHelpSolutionSerializer
    permission_classes = [AllowAny]  # Allow anyone to access

    def perform_create(self, serializer):
        serializer.save()  # Remove user association


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if this.action == 'create':
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


def generate_qr_code(request, ticket_id):
    ticket = get_object_or_404(Ticket, id=ticket_id)

    ticket_url = request.build_absolute_uri(f'/ticket/{ticket_id}')

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(ticket_url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)

    return render(request, 'metro_project/ticket_qr.html', {
        'ticket': ticket,
        'qr_image': buffer.getvalue().hex()
    })


def show_test_ticket(request):
    # Mock ticket data
    ticket = {
        'ticket_id': 'ABC123',
        'destination': 'Uttara',
        'price': 50
    }

    # Create QR code
    qr = qrcode.make(
        f"Ticket ID: {ticket['ticket_id']}, Destination: {ticket['destination']}, Price: {ticket['price']}")
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    qr_image = base64.b64encode(buffer.getvalue()).decode()

    return render(request, 'ticket.html', {'ticket': ticket, 'qr_image': qr_image})


class BearerTokenAuthentication(TokenAuthentication):
    keyword = 'Token'  # Change the expected keyword to "Bearer"


@api_view(['POST'])
@authentication_classes([TokenAuthentication])  # Apply TokenAuthentication
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def create_ticket(request):
    # Debugging: Log the user and Authorization header
    print(f"Authorization Header: {request.headers.get('Authorization')}")
    print(f"Authenticated User: {request.user}")

    if request.user.is_anonymous:
        return JsonResponse({'error': 'Authentication required.'}, status=401)

    try:
        data = json.loads(request.body)

        # Validate required fields
        destination = data.get('destination')
        price = data.get('price')

        if not destination or not price:
            return JsonResponse({'error': 'Destination and price are required fields.'}, status=400)

        # Ensure price is a valid number
        try:
            price = float(price)
            if price <= 0:
                raise ValueError("Price must be greater than zero.")
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)

        # Create the ticket
        ticket = Ticket.objects.create(
            user=request.user,
            destination=destination,
            price=price
        )
        return JsonResponse({'ticket_id': ticket.ticket_id, 'message': 'Ticket created successfully!'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    except Exception as e:
        # Log the error for debugging
        print(f"Error creating ticket: {e}")
        return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def generate_ticket_qr(request, ticket_id):
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id, user=request.user)
        # Update the port to 8080
        ticket_url = f"http://{request.get_host().split(':')[0]}:8080/ticket/{ticket_id}/"

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(ticket_url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        qr_image = base64.b64encode(buffer.getvalue()).decode()

        return Response({'qr_image': qr_image})
    except Exception as e:
        # Log the error for debugging
        print(f"Error generating QR code for ticket {ticket_id}: {e}")
        return Response({'error': 'Failed to generate QR code.'}, status=500)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_tickets(request):
    tickets = Ticket.objects.filter(user=request.user)
    ticket_data = [
        {
            "id": ticket.id,
            "destination": ticket.destination,
            "price": ticket.price,
            "created_at": ticket.created_at,
        }
        for ticket in tickets
    ]
    return Response(ticket_data)


@api_view(['GET'])
@permission_classes([AllowAny])  # Allow access to anyone
def get_ticket_details(request, ticket_id):
    try:
        ticket = get_object_or_404(Ticket, id=ticket_id)
        return Response({
            "id": ticket.id,
            "destination": ticket.destination,
            "price": ticket.price,
            "created_at": ticket.created_at,
        })
    except Exception as e:
        # Log the error for debugging
        print(f"Error fetching ticket details: {e}")
        return Response({'error': 'Failed to fetch ticket details.'}, status=500)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_ticket(request, ticket_id):
    try:
        ticket = Ticket.objects.get(id=ticket_id, user=request.user)
        ticket.delete()
        return Response({'message': 'Ticket deleted successfully!'}, status=HTTP_200_OK)
    except Ticket.DoesNotExist:
        return Response({'error': 'Ticket not found or unauthorized.'}, status=HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])  # Allow access to anyone
def get_all_tickets(request):
    try:
        tickets = Ticket.objects.all()
        ticket_data = [
            {
                "id": ticket.id,
                "ticket_id": ticket.ticket_id,
                "user": {
                    "id": ticket.user.id,
                    "name": ticket.user.username,
                    "email": ticket.user.email,
                },
                "destination": ticket.destination,
                "price": ticket.price,
                "created_at": ticket.created_at,
            }
            for ticket in tickets
        ]
        return Response(ticket_data, status=200)
    except Exception as e:
        # Log the error for debugging
        print(f"Error fetching all tickets: {e}")
        return Response({'error': 'Failed to fetch tickets.'}, status=500)
