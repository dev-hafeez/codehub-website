from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
import os, re, shutil
from django.conf import settings
from .models import InlineImage

def get_tokens_for_user(user, **claims):
    """
    Creates the JWT manually and adds custom claims. The claims will
    be encoded in the JWT.

    :param user: The User instance
    :param claims: Dict containing additional claims
    :return: Encoded access and refresh tokens
    """
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


TEMP_INLINE_PREFIX = "/media/temp_inline/"

def finalize_inline_images(content, blog_id):
    """
    Moves inline images from temp_inline/ to blog_images/<blog_id>/,
    updates the blog content paths, and cleans up InlineImage rows.
    """
    if not content:
        return content

    temp_pattern = r'src="/media/temp_inline/([^"]+)"'
    matches = re.findall(temp_pattern, content)

    if not matches:
        return content

    blog_dir = os.path.join(settings.MEDIA_ROOT, f'blog_images/{blog_id}')
    os.makedirs(blog_dir, exist_ok=True)

    for filename in matches:
        src_path = os.path.join(settings.MEDIA_ROOT, "temp_inline", filename)
        dst_path = os.path.join(blog_dir, filename)

        if os.path.exists(src_path):
            # Move the file to blog_images/<blog_id>/
            shutil.move(src_path, dst_path)

            # Update the content path
            content = content.replace(
                f'/media/temp_inline/{filename}',
                f'/media/blog_images/{blog_id}/{filename}'
            )

            # Delete InlineImage row if it exists
            InlineImage.objects.filter(image=f"temp_inline/{filename}").delete()

    return content