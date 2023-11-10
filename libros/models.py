from django.db import models


# Create your models here.
class Libro(models.Model):
    autor = models.CharField(max_length=50)
    libro = models.CharField(max_length=30)
    editorial = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = "Libros"

    def __str__(self):
        return f"{self.libro}"

    def __unicode__(self):
        return self.libro
