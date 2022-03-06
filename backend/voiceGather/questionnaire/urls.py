from django.urls import re_path
from django.conf.urls import include
from rest_framework import routers
from questionnaire.viewsets.questionnaire_viewset import QuestionnaireViewSet
from questionnaire.viewsets.category_viewset import CategoryViewSet

app_name = 'questionnaire'

router = routers.DefaultRouter()
router.register(r'questionnaires', QuestionnaireViewSet, basename='Questionnaires')
router.register(r'categories', CategoryViewSet, basename='Categories')

urlpatterns = [
    re_path(r'', include(router.urls)),
]