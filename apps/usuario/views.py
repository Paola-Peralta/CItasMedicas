from django.shortcuts import render
from django.http import JsonResponse
from apps.usuario.models import User

from apps.usuario.serializers import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/usuario/token/',
        '/usuario/register/',
        '/usuario/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UserSerializer
# from drf_yasg.utils import swagger_auto_schema

# class UserCreate(APIView):
#     @swagger_auto_schema(request_body=UserSerializer)
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)

#         #Validar datos
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"Mensaje": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)

#         #En caso de error retornar las validaciones
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
