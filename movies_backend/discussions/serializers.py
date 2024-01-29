from rest_framework import serializers

from .models import Discussion, Comment


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    user_comment_count = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Comment
        fields = ['user', 'discussion', 'text', 'user_comment_count', 'created_at']
        read_only_fields = ['user', 'user_comment_count', 'created_at']

    @staticmethod
    def get_user_comment_count(obj):
        return Comment.objects.filter(
            user=obj.user, discussion=obj.discussion
        ).count()


class DiscussionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    title = serializers.StringRelatedField(
        source='movie.title', read_only=True
    )

    class Meta:
        model = Discussion
        fields = ['id', 'title', 'comments']
