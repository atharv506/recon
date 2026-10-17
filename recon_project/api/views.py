
import json
import uuid
from datetime import date

from django.core.files.base import ContentFile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from nbformat import versions

from .models import Case, ReconstructionVersion

from ai.recon_pipeline import generate_composite
from ai.refinement import refine_facial_attributes
from ai.version_generator import generate_from_attributes


def create_case_number():
    return f"RECON-{date.today():%Y%m%d}-{uuid.uuid4().hex[:8].upper()}"


@csrf_exempt
def generate_composite_view(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Invalid request method. Use POST."},
            status=405,
        )

    try:
        data = json.loads(request.body)
        description = data.get("description", "").strip()

        if not description:
            return JsonResponse(
                {"error": "Description is required."},
                status=400,
            )

        # Generate the composite using the existing AI pipeline.
        result = generate_composite(description)

        # Save the case and its first version.
        with transaction.atomic():
            case = Case.objects.create(
                case_number=create_case_number(),
                title=data.get("title", "").strip(),
                witness_description=description,
            )

            version = ReconstructionVersion(
                case=case,
                version_number=1,
                facial_attributes=result["attributes"],
                prompt=result["prompt"],
            )

            filename = f"version_001_{uuid.uuid4().hex[:8]}.png"
            version.image.save(
                filename,
                ContentFile(result["image"]),
                save=False,
            )
            version.save()

        return JsonResponse({
            "case_id": case.id,
            "case_number": case.case_number,
            "version": version.version_number,
            "attributes": version.facial_attributes,
            "prompt": version.prompt,
            "image_url": request.build_absolute_uri(version.image.url),
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    except Exception:
        return JsonResponse(
            {"error": "Unable to generate or save the composite."},
            status=500,
        )


@csrf_exempt
def refine_composite_view(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Invalid request method. Use POST."},
            status=405,
        )

    try:
        data = json.loads(request.body)

        case_id = data.get("case_id")
        current_attributes = data.get("current_attributes")
        modification = data.get("modification", "").strip()

        if not case_id:
            return JsonResponse(
                {"error": "case_id is required."},
                status=400,
            )

        if not isinstance(current_attributes, dict) or not current_attributes:
            return JsonResponse(
                {"error": "Valid current_attributes are required."},
                status=400,
            )

        if not modification:
            return JsonResponse(
                {"error": "Modification is required."},
                status=400,
            )

        try:
            case = Case.objects.get(pk=case_id)
        except Case.DoesNotExist:
            return JsonResponse(
                {"error": "Case not found."},
                status=404,
            )

        # Apply the requested changes with Gemini.
        updated_attributes = refine_facial_attributes(
            current_attributes,
            modification,
        )

        # Generate the updated composite.
        result = generate_from_attributes(updated_attributes)

        # Determine the next version from the database.
        with transaction.atomic():
            latest_version = (
                ReconstructionVersion.objects
                .filter(case=case)
                .order_by("-version_number")
                .first()
            )

            new_version = (
                latest_version.version_number + 1
                if latest_version
                else 1
            )

            version = ReconstructionVersion(
                case=case,
                version_number=new_version,
                facial_attributes=updated_attributes,
                prompt=result["prompt"],
            )

            filename = (
                f"version_{new_version:03d}_{uuid.uuid4().hex[:8]}.png"
            )
            version.image.save(
                filename,
                ContentFile(result["image"]),
                save=False,
            )
            version.save()

        return JsonResponse({
            "case_id": case.id,
            "case_number": case.case_number,
            "version": version.version_number,
            "attributes": version.facial_attributes,
            "prompt": version.prompt,
            "image_url": request.build_absolute_uri(version.image.url),
        })

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    except Exception:
        return JsonResponse(
            {"error": "Unable to refine or save the composite."},
            status=500,
        )
@csrf_exempt
def case_versions_view(request, case_number):
    try:
        case = Case.objects.get(case_number=case_number)
        versions = case.versions.all()
        version_list = []

        for version in versions:
            version_list.append({
                "version": version.version_number,
                "prompt": version.prompt,
                "image_url": request.build_absolute_uri(version.image.url)
            })

        return JsonResponse({
            "case_number": case.case_number,
            "versions": version_list,
        })

    except Case.DoesNotExist:
        return JsonResponse(
            {"error": "Case not found."},
            status=404,
        )