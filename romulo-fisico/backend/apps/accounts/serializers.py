from rest_framework import serializers

from .models import Account


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(trim_whitespace=False, write_only=True)


class MeSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ["id", "email", "roles"]  # explicit allowlist

    def get_roles(self, obj: Account) -> list[str]:
        return sorted(obj.active_roles())
