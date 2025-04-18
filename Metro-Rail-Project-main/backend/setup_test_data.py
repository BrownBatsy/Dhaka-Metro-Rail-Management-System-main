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

def create_test_data():
    # Get all users
    users = User.objects.all()
    
    if not users.exists():
        print("No users found. Please create users first.")
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
    
    # Create payments for each user
    payments_data = []
    for user in users:
        # Create 3-8 payments per user
        num_payments = random.randint(3, 8)
        
        for i in range(num_payments):
            # Random date in the last 30 days
            days_ago = random.randint(0, 30)
            payment_date = datetime.now() - timedelta(days=days_ago)
            
            # Create payment
            payment = Payment.objects.create(
                user=user,
                method=random.choice(payment_methods),
                reference=f"REF{random.randint(10000000, 99999999)}",
                amount=Decimal(random.choice([60, 100, 120, 150])),
                timestamp=payment_date
            )
            payments_data.append(payment)
    
    print(f"Created {len(payments_data)} payments")
    
    # Create journeys for each user
    journeys_data = []
    for user in users:
        # Create 5-10 journeys per user
        num_journeys = random.randint(5, 10)
        
        for i in range(num_journeys):
            # Random date in the last 30 days
            days_ago = random.randint(0, 30)
            journey_date = datetime.now() - timedelta(days=days_ago)
            
            # 75% chance of having a payment
            has_payment = random.random() < 0.75
            payment = None
            
            if has_payment:
                # Get one of the user's payments or None
                user_payments = Payment.objects.filter(user=user)
                if user_payments.exists():
                    payment = random.choice(user_payments)
            
            # Create journey
            journey = Journey.objects.create(
                user=user,
                route=random.choice(routes),
                date=journey_date.date(),
                fare=Decimal(random.choice([60, 100, 120, 150])),
                payment=payment
            )
            journeys_data.append(journey)
    
    print(f"Created {len(journeys_data)} journeys")

if __name__ == "__main__":
    print("Starting to create test data...")
    create_test_data()
    print("Test data creation completed!") 