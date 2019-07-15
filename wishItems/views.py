# # from rest_framework.response import Response
# # from rest_framework.decorators import api_view
# from rest_framework import status, viewsets, permissions

# # from django.contrib.auth.decorators import login_required
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# # from django.shortcuts import render

# from .serializers import WishItemSerializer
# from .models import WishItem 

# from rest_framework import viewsets, permissions
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# # from django.shortcuts import render

# from .serializers import WishItemSerializer
# from .models import WishItem 
# """
# List wish items, or create a wish item
# """
# class ItemViewSet(viewsets.ModelViewSet):

#     queryset = WishItem.objects.all()
#     serializer_class = WishItemSerializer
#     permissions_classes = [
#         permissions.AllowAny
#     ]

#     @action(detail=False, methods=['GET'])
#     # @api_view(['GET', 'POST'])
#     def list(self, request, *args, **kwargs):

#         if request.method == 'GET':
#             # retrieve a list of wish items
#             items = WishItem.objects.all()
#             data = []
#             nextPage = prevPage = 1
#             curPage = request.GET.get('page', 1)
#             paginator = Paginator(items, 5)

#             try:
#                 data = paginator.page(curPage)
#             except PageNotAnInteger:
#                 data = paginator.page(1)
#             except EmptyPage:
#                 data = paginator.page(paginator.num_pages)

#             # serializer = WishItemSerializer(data, context={'request': request}, many = True) 
#             serializer = WishItemSerializer(data, many = True) 

#             serializedData = serializer.data
#             if data.has_next():
#                 nextPage = data.next_page_number()
#             if data.has_previous():
#                 prevPage = data.previous_page_number()

#             dataSendToFrontEnd = {
#                 'data': serializedData,
#                 'count of items': paginator.count,
#                 'number of pages': paginator.num_pages,
#                 'next page': '/api/items/?page=' + str(nextPage),
#                 'previous page': '/api/items/?page=' + str(prevPage),
#             }

#             return super(ItemViewSet, self).list(request)
#             return Response(dataSendToFrontEnd)

#     # @api_view(['GET', 'POST'])
#     # def list_of_wishItems(self, request):
#     #     # retrieve a list of wish items
#     #     if request.method == 'GET':
#     #         items = WishItem.objects.all()
#     #         data = []
#     #         nextPage = prevPage = 1
#     #         curPage = request.GET.get('page', 1)
#     #         paginator = Paginator(items, 5)

#     #         try:
#     #             data = paginator.page(curPage)
#     #         except PageNotAnInteger:
#     #             data = paginator.page(1)
#     #         except EmptyPage:
#     #             data = paginator.page(paginator.num_pages)

#     #         # serializer = WishItemSerializer(data, context={'request': request}, many = True) 
#     #         serializer = WishItemSerializer(data, many = True) 

#     #         serializedData = serializer.data
#     #         if data.has_next():
#     #             nextPage = data.next_page_number()
#     #         if data.has_previous():
#     #             prevPage = data.previous_page_number()

#     #         dataSendToFrontEnd = {
#     #             'data': serializedData,
#     #             'count of items': paginator.count,
#     #             'number of pages': paginator.num_pages,
#     #             'next page': '/api/items/?page=' + str(nextPage),
#     #             'previous page': '/api/items/?page=' + str(prevPage),
#     #         }

#     #         return Response(dataSendToFrontEnd)
        
#     #     # create a new wish item
#     #     elif request.method == 'POST':
#     #         data = request.data
#     #         serializer = WishItemSerializer(data=data)
            
#     #         if serializer.is_valid():
#     #             serializer.save()
#     #             return Response(serializer.data, status=status.HTTP_201_CREATED)
            
#     #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     # """
#     # Get or update, delete one of the wish items,
#     # """
#     # @api_view(['GET', 'PUT', 'DELETE'])
#     # def wishItem_detail(self, request, pk):

#         try:
#             item = WishItem.objects.get(pk=pk)
#         except item.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         # select by id
#         if request.method == 'GET':
#             serializedData = WishItemSerializer(item).data
#             return Response(serializedData)    
        
#         # update by id
#         elif request.method == 'PUT':
#             newItem = request.data
#             serializer = WishItemSerializer(item, data=newItem)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         # delete by id
#         elif request.method =='DELETE':
#             item.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
    