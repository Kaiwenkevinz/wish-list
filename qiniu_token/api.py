from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from qiniu import Auth
from datetime import datetime

@api_view(['GET'])
def qiniu_token(request):

    access_key = "a4QjSp69m13uPcyhFQCIn5FHaOxXgV3_OD4yBEOX"
    secret_key = "swIXM2xTo0SYGqLdC-ju3sY6YUlvudznvG6ye1SW"
    bucket_name = 'wishlist9710'
    key = datetime.now()
    # key = 99

    q = Auth(access_key, secret_key)
    token = q.upload_token(bucket_name, key, 3600)

    return Response(token)