# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from leaderboard import views                           

router = routers.DefaultRouter()                      
router.register(r'leaderboard', views.LeaderboardView, 'leaderboard')     

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))                
]