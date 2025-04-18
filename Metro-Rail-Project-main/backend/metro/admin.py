from django.contrib import admin
from .models import User, Journey, Payment, LostItem, UserLostReport, Feedback, Complaint

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'is_admin', 'date_joined')
    list_filter = ('is_admin', 'is_active')
    search_fields = ('name', 'email')

@admin.register(Journey)
class JourneyAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'route', 'date', 'fare', 'payment')
    list_filter = ('date',)
    search_fields = ('route', 'user__name')
    raw_id_fields = ('user', 'payment')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'method', 'reference', 'amount', 'timestamp')
    list_filter = ('method', 'timestamp')
    search_fields = ('reference', 'user__name')
    raw_id_fields = ('user',)

@admin.register(LostItem)
class LostItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'location', 'status', 'posted_by')
    list_filter = ('status',)
    search_fields = ('title', 'description')
    raw_id_fields = ('posted_by',)

@admin.register(UserLostReport)
class UserLostReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'contact', 'submitted_at')
    search_fields = ('title', 'description', 'user__name')
    raw_id_fields = ('user',)

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'rating', 'created_at')
    list_filter = ('rating',)
    search_fields = ('comment', 'user__name')
    raw_id_fields = ('user',)

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'urgency', 'status', 'submitted_at')
    list_filter = ('urgency', 'status')
    search_fields = ('title', 'description', 'user__name')
    raw_id_fields = ('user',) 