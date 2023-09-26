from django.db import models

class Task(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    completa = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo

