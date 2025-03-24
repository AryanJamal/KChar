# K_Char/middleware.py
from django.http import JsonResponse


class APIKeyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the request is for the private API
        if request.path == "/api/predict-character/":
            api_key = request.headers.get("X-API-Key")
            if api_key != "A1Xwla3z4b":  # Replace with your actual API key
                return JsonResponse(
                    {"status": "error", "message": "Invalid API key"}, status=401
                )
        return self.get_response(request)
