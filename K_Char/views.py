from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from tensorflow.keras.models import load_model  # type: ignore
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
import cv2
import numpy as np
from decouple import config


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(
                {"status": "success", "message": "Logged in successfully"}
            )
        else:
            return JsonResponse(
                {"status": "error", "message": "Invalid credentials"}, status=400
            )
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )


@csrf_exempt
def user_register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        if not username or not password or not email:
            return JsonResponse(
                {"status": "error", "message": "All fields are required"}, status=400
            )
        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"status": "error", "message": "Username already exists"}, status=400
            )
        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        user.save()
        login(request, user)
        return JsonResponse(
            {"status": "success", "message": "Registered and logged in successfully"}
        )
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )


@csrf_exempt
def user_logout(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"status": "success", "message": "Logged out successfully"})
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )


@csrf_exempt
def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": True})
    return JsonResponse({"isAuthenticated": False})


# Load your H5 model
model = load_model(config("MODEL_PATH"))


@csrf_exempt
def predict_character(request):
    if request.method == "POST" and request.FILES.get("image"):
        # Read the image from the request
        image_file = request.FILES["image"]
        image_bytes = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (32, 32))  # Resize to match model input size
        img = img / 255.0  # Normalize
        img = img.reshape(1, 32, 32, 3)  # Add batch dimension

        # Predict the character
        prediction = model.predict(img)
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Map the predicted class to the corresponding character
        characters = [
            "ا",
            "ب",
            "ج",
            "چ",
            "د",
            "ە",
            "ێ",
            "ف",
            "گ",
            "ه",
            "ح",
            "ی",
            "ژ",
            "ک",
            "ل",
            "ڵ",
            "م",
            "ن",
            "ۆ",
            "پ",
            "ق",
            "ر",
            "ڕ",
            "س",
            "ش",
            "ت",
            "و",
            "وو",
            "ڤ",
            "خ",
            "غ",
            "ز",
            "ع",
            "ئ",
        ]
        predicted_character = characters[predicted_class]
        print(predicted_character)
        return JsonResponse({"character": predicted_character})
    return JsonResponse({"error": "Invalid request"}, status=400)


@require_POST
def send_email(request):
    if request.method == "POST":
        name = request.POST.get("name")
        message = request.POST.get("message")
        email = request.POST.get("email")
        # print(request.headers)
        if not name or not message or not email:
            return JsonResponse(
                {"status": "error", "message": "All fields are required"}, status=400
            )
        try:
            # Send the email
            send_mail(
                subject=f"New Message from {name}",
                message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
                from_email=config("EMAIL_HOST_USER"),
                recipient_list=[config("EMAIL_HOST_USER")],  # Your email address
            )

            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=405
    )
