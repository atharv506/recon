from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import urllib.parse
import json
from ai.recon_pipeline import generate_composite


@csrf_exempt
def generate_composite_view(request):
    if request.method !="POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
    try:
        data = json.loads(request.body)
        description = data.get("description")
        if not description:
            return JsonResponse({"error": "Description is required."}, status=400)
        result = generate_composite(description)
        image_path = "generated_face.png"
        with open(image_path, "wb") as f:
            f.write(result["image"])

        response_data = {
            "attributes": result["attributes"],
            "prompt": result["prompt"],
            "image_path": image_path
        }
        return JsonResponse(response_data)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    
