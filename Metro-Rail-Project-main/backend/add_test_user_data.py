import os
import sys
import django
import random
from datetime import datetime, timedelta
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

from metro.models import User, Journey, Payment

def add_test_user_data():
    try:
        # Get the test user by email
        test_user = User.objects.get(email="testuser@example.com")
        print(f"Found test user: {test_user.name}")
    except User.DoesNotExist:
        print("Test user not found. Please register a user with email testuser@example.com first.")
        return
    
    # Sample routes
    routes = [
        "Uttara North - Motijheel",
        "Agargaon - Uttara Center",
        "Pallabi - Agargaon",
        "Mirpur 10 - Farmgate",
        "Kazipara - Shahbagh",
        "Uttara South - Pallabi",
        "Mirpur 11 - Motijheel",
        "Uttara Center - Shahbagh",
        "Agargaon - Kazipara",
        "Pallabi - Farmgate"
    ]
    
    # Sample payment methods
    payment_methods = ['bKash', 'Nagad', 'Rocket', 'Card']
    
    # Create payments for the test user
    payments_data = []
    # Create 5 payments
    for i in range(5):
        # Random date in the last 30 days
        days_ago = random.randint(0, 30)
        payment_date = datetime.now() - timedelta(days=days_ago)
        
        # Create payment
        payment = Payment.objects.create(
            user=test_user,
            method=random.choice(payment_methods),
            reference=f"REF{random.randint(10000000, 99999999)}",
            amount=Decimal(random.choice([60, 100, 120, 150])),
            timestamp=payment_date
        )
        payments_data.append(payment)
    
    print(f"Created {len(payments_data)} payments for {test_user.name}")
    
    # Create journeys for the test user
    journeys_data = []
    # Create 8 journeys
    for i in range(8):
        # Random date in the last 30 days
        days_ago = random.randint(0, 30)
        journey_date = datetime.now() - timedelta(days=days_ago)
        
        # 75% chance of having a payment
        has_payment = random.random() < 0.75
        payment = None
        
        if has_payment and payments_data:
            # Get one of the user's payments
            payment = random.choice(payments_data)
        
        # Create journey
        journey = Journey.objects.create(
            user=test_user,
            route=random.choice(routes),
            date=journey_date.date(),
            fare=Decimal(random.choice([60, 100, 120, 150])),
            payment=payment
        )
        journeys_data.append(journey)
    
    print(f"Created {len(journeys_data)} journeys for {test_user.name}")

if __name__ == "__main__":
    print("Starting to add test data for the test user...")
    add_test_user_data()
    print("Test data creation completed!") 