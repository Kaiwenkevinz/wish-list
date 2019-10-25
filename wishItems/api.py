from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from django.shortcuts import render

from .serializers import WishItemSerializer
from .models import WishItem 

"""
qiniu token
"""


"""
List wish items, or create a wish item
"""
class ItemViewSet(viewsets.ModelViewSet):

    queryset = WishItem.objects.all()
    serializer_class = WishItemSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        queryset = request.user.item.all()
        data = []
        nextPage = prevPage = 1
        curPage = request.GET.get('page', 1)
        paginator = Paginator(queryset, 5)

        try:
            data = paginator.page(curPage)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = WishItemSerializer(data, many = True) 

        serializedData = serializer.data
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            prevPage = data.previous_page_number()

        dataSendToFrontEnd = {
            'data': serializedData,
            'count of items': paginator.count,
            'number of pages': paginator.num_pages,
            'next page': '/api/items/?page=' + str(nextPage),
            'previous page': '/api/items/?page=' + str(prevPage),
        }

        return Response(data=dataSendToFrontEnd)

    def create(self, request):
        data = request.data
        serializer = WishItemSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            item = WishItem.objects.get(pk=pk)
        except item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = WishItemSerializer(item).data

        return Response(data=data)
    
    def update(self, request, pk=None):
        try:
            item = WishItem.objects.get(pk=pk)
        except item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        newItem = request.data
        serializer = WishItemSerializer(item, data=newItem)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            item = WishItem.objects.get(pk=pk)
        except item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)