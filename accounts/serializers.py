from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class CustomRegisterSerializer(RegisterSerializer):
    city = serializers.CharField(required=False)
    gender = serializers.CharField(required=False)
    country = serializers.CharField(required=False)

    def get_cleaned_data(self):
        cleaned_data = super().get_cleaned_data()
        cleaned_data['city'] = self.validated_data.get('city', '')
        cleaned_data['gender'] = self.validated_data.get('gender', '')
        cleaned_data['country'] = self.validated_data.get('country', '')
        return cleaned_data

    def save(self, request):
        user = super().save(request)

        user_profile = user.userprofile
        user_profile.city = self.validated_data.get('city', '')
        user_profile.gender = self.validated_data.get('gender', '')
        user_profile.country = self.validated_data.get('country', '')
        user_profile.save()

        return user