from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from qiniu_token import api

urlpatterns = [
    path('qiniu/token/', api.qiniu_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)