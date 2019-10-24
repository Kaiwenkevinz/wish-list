from django.db import models
from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError

from django.contrib.auth.models import User

def validate_price(value):
    if value <= 0:
        raise ValidationError('Error: price should be bigger than 0' % value)

class WishItem(models.Model):
    name = models.CharField("name", max_length=255)
    wantness = models.IntegerField()
    price = models.IntegerField(validators=[validate_price])
    date_created = models.DateTimeField("Date created", default=timezone.now)
    result =  models.CharField("result", max_length=255)
    img_url = models.CharField("img_url", max_length=255)
    owner = models.ForeignKey(User, related_name="item", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name + ' ' + str(self.wantness) + ' ' + str(self.price) + ' ' + str(self.date_created) + ' ' + self.img_url + self.result
