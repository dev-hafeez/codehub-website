from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail


def get_tokens_for_user(user, **claims):
    refresh = RefreshToken.for_user(user)
    refresh['user_id'] = user.id
    refresh['email'] = user.email
    refresh['otp'] = claims['otp']
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def send_otp(destination: str, **data):
    """
    Sends OTP to destination. This function is currently development
    only. It uses the 'file' backend and so it will dump all emails to tmp/api_messages.

    :param destination: Receiver's email
    :param data: Dict containing extra data (Optional)
    """
    send_mail(
        "OTP Verification",
        f"This is your requested OTP: {data['otp']}",
        "no_reply@example.com",
        [destination],
        fail_silently=False,
    )