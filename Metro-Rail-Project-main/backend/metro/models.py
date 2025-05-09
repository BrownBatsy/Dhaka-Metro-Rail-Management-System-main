from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)


class Journey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    route = models.CharField(max_length=255)
    date = models.DateField()
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, null=True)

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
    image_url = models.ImageField(
        upload_to='lost_items/', null=True, blank=True)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=[(
        'claimed', 'Claimed'), ('unclaimed', 'Unclaimed')])
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
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='open')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}'s complaint: {self.title}"


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Generate unique ticket_id
    ticket_id = models.CharField(
        max_length=50, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)
    destination = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Ticket {self.ticket_id} for {self.user.username}"


class MedicalHelp(models.Model):
    user = models.ForeignKey(
        # Allow null and blank
        User, on_delete=models.CASCADE, related_name="medical_helps", null=True, blank=True
    )
    problem = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.problem


class MedicalHelpSolution(models.Model):
    medical_help = models.ForeignKey(
        MedicalHelp, on_delete=models.CASCADE, related_name="solutions")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="solutions")
    solution = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Solution by {self.user.username} for {self.medical_help.problem}"
