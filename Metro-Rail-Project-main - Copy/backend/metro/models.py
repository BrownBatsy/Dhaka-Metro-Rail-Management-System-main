from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.conf import settings

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)

class Journey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    route = models.CharField(max_length=255)
    date = models.DateField()
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.user.name}'s journey on {self.date}"

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('bKash', 'bKash'),
        ('Nagad', 'Nagad'),
        ('Rocket', 'Rocket'),
        ('Card', 'Card'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    reference = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}'s payment of {self.amount}"

class LostItem(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.ImageField(upload_to='lost_items/', null=True, blank=True)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=[('claimed', 'Claimed'), ('unclaimed', 'Unclaimed')])
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class UserLostReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    contact = models.CharField(max_length=255)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}'s lost report: {self.title}"

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}'s feedback"

class Complaint(models.Model):
    URGENCY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]

    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='open')
    submitted_at = models.DateTimeField(auto_now_add=True)

User = get_user_model()

class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    total = models.IntegerField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "quiz_result"

    def __str__(self):
       return f"{self.user.username}: {self.score}/{self.total}"
    
    
    


class ServiceAlert(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    affected_stations = models.TextField(blank=True)
    estimated_duration = models.CharField(max_length=255, blank=True)
    alternative_routes = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="service_alerts"
    )

    def __str__(self):
        return self.title