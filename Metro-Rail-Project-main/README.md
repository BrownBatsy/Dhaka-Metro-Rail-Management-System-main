# Frontend Requirements
# -------------------
## Node.js and npm
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

## Core Frontend Dependencies
- React 18.3+
- React Router DOM 6.26+
- TailwindCSS 3.4+
- Vite 5.4+

## UI Components and Styling
- Shadcn/ui components
- Lucide React icons
- class-variance-authority & clsx
- tailwind-merge & tailwindcss-animate

## Form Management
- React Hook Form 7.53+
- Zod validation 3.23+
- @hookform/resolvers 3.9+

## Data Handling
- TanStack React Query 5.56+
- Axios 1.8+
- date-fns 3.6+

## Notification and UI Enhancement
- React Hot Toast
- Sonner
- React Day Picker

# Backend Requirements
# ------------------
## Python Environment
- Python 3.8+
- Virtual environment (recommended)

## Django Framework
- Django 4.2.20
- Django REST Framework 3.14.0
- django-cors-headers 4.3.1

## Image Processing
- Pillow 10.2.0

## Environment Management
- python-dotenv 1.0.0

# Setup Instructions
# -----------------
## Frontend Setup
1. Clone repository: git clone https://github.com/Sadman-26/metro-track-dhaka-rail.git
2. Navigate to project: cd metro-track-dhaka-rail
3. Install dependencies: npm install
4. Start development server: npm run dev

## Backend Setup
1. Navigate to backend directory: cd backend
2. Create virtual environment: python -m venv venv
3. Activate virtual environment:
   - Windows: venv\Scripts\activate
   - macOS/Linux: source venv/bin/activate
4. Install Python dependencies: pip install -r requirements.txt
5. Apply migrations: python manage.py migrate
6. Optional - Create superuser: python manage.py createsuperuser
7. Start backend server: python manage.py runserver

# Running the Application
# ---------------------
- Frontend will be available at: http://localhost:3000 or http://localhost:5173 (Vite default)
- Backend API will be available at: http://localhost:8000
- Both servers must be running simultaneously for the application to work properly

