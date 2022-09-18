from django.conf.urls import include
from django.urls import re_path
from rest_framework import routers

from questionnaire.viewsets.answer_viewset import AnswerViewSet
from questionnaire.viewsets.category_viewset import CategoryViewSet
from questionnaire.viewsets.keyword_viewset import KeywordViewSet
from questionnaire.viewsets.questionnaire_viewset import QuestionnaireViewSet

app_name = "questionnaire"

router = routers.DefaultRouter()
router.register(r"questionnaire", QuestionnaireViewSet, basename="Questionnaire")
router.register(r"category", CategoryViewSet, basename="Category")
router.register(r"keyword", KeywordViewSet, basename="Keyword")
router.register(r"text_answer", AnswerViewSet, basename="TextAnswer")
router.register(r"select_answer", AnswerViewSet, basename="SelectAnswer")

urlpatterns = [re_path(r"", include(router.urls))]
