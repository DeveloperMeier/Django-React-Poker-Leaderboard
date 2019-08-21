from django.contrib import admin
from .models import Leaderboard 

class LeaderboardAdmin(admin.ModelAdmin):  
  list_display = ('name', 'winnings', 'country') 

admin.site.register(Leaderboard, LeaderboardAdmin) 

