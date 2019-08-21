from django.db import models

class Leaderboard(models.Model):
  name = models.CharField(max_length=80)
  winnings = models.DecimalField(decimal_places=2, max_digits=100)
  country = models.CharField(max_length=120)

  def _str_(self):
    return f"{self.name}:{self.country}={self.winnings}"