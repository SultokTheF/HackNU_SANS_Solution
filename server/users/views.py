# REST
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# Auth
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.views import TokenObtainPairView

# Dependencies
from .models import *
from .serializers import *

class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Success on Register", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  authentication_classes = [JWTAuthentication, SessionAuthentication]
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return User.objects.all().order_by('id')
    
class UserAPIView(APIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  authentication_classes = [JWTAuthentication, SessionAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user_id = request.user.id

    try:
      user = User.objects.get(id=user_id)
    except User.DoesNotExist:
      return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user)

    return Response(serializer.data, status=status.HTTP_200_OK)
  

# class CustomTokenObtainPairView(TokenObtainPairView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         if response.status_code == 200:
#             access_token = response.data['refresh']
#             response.set_cookie(key='refreshToken', value=access_token, httponly=True)
#         return response
  
class LeadersAPIView(APIView):
    def get(self, request):
        # Retrieve all users and sort them by xp
        users = User.objects.all().order_by('-xp')  # '-' denotes descending order

        # Serialize the sorted users
        serializer = UserSerializer(users, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# views.py

class GetUserByIdAPIView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the user data with required fields
        serialized_data = {
            'profile_image': user.profile_image,
            'first_name': user.first_name,
            'surname': user.surname,
            'xp': user.xp,
            'username': user.username,
            'email': user.email
        }

        # Return the serialized data
        return Response(serialized_data, status=status.HTTP_200_OK)
