from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import LeaderboardSerializer      
from .models import Leaderboard                     

class LeaderboardView(viewsets.ModelViewSet):       
  serializer_class = LeaderboardSerializer          
  queryset = Leaderboard.objects.all()             