from django.contrib import admin
from django.utils.html import format_html

from . import models


class ActorInline(admin.TabularInline):
    model = models.Actor.movies.through
    extra = 1


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'director_display', 'display_poster')
    search_fields = ('title', )
    readonly_fields = ('display_poster', )
    inlines = [ActorInline]

    @staticmethod
    def director_display(obj):
        return obj.director.full_name()

    @staticmethod
    def display_poster(obj):
        return format_html(
            '<img src="{}" style="max-width:200px; max-height:200px"/>'.format(obj.poster.url)
        )


admin.site.register(models.Movie, MovieAdmin)
admin.site.register(models.Actor)
admin.site.register(models.Director)
admin.site.register(models.Review)
