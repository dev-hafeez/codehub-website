from rest_framework import permissions

# Custom permissions for user types

class IsLead(permissions.BasePermission):
    message = 'Only user type: \'lead\' is allowed to use this endpoint.'

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'lead'