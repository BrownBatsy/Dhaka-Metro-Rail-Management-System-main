from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.generic import RedirectView

# Simple view for the root URL
def api_status(request):
    return JsonResponse({
        'status': 'online',
        'message': 'Metro Track API is running. Please use the frontend application.',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'auth': '/api/auth/'
        }
    })

urlpatterns = [
    # Root URL pattern
    path('', api_status, name='api_status'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/', include('metro.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
