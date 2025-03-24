from django.urls import path
from . import views
from django.urls import path, re_path
from django.views.generic import TemplateView


urlpatterns = [
    path("predict/", views.predict_character, name="predict_character"),
    path("login/", views.user_login, name="user_login"),
    path("register/", views.user_register, name="user_register"),
    path("logout/", views.user_logout, name="user_logout"),
    path("check-auth/", views.check_auth, name="check_auth"),
    path("send-email/", views.send_email, name="send_email"),
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]

handler404 = 'K_Char.views.custom_404_view'