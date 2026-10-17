
from django.db import models


class Case(models.Model):
    case_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200, blank=True)
    witness_description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.case_number} - {self.title or 'Untitled Case'}"


class ReconstructionVersion(models.Model):
    case = models.ForeignKey(
        Case,
        on_delete=models.CASCADE,
        related_name="versions",
    )
    version_number = models.PositiveIntegerField()
    facial_attributes = models.JSONField(default=dict)
    prompt = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="reconstructions/",
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["version_number"]
        constraints = [
            models.UniqueConstraint(
                fields=["case", "version_number"],
                name="unique_case_reconstruction_version",
            )
        ]

    def __str__(self):
        return f"{self.case.case_number} - Version {self.version_number}"
