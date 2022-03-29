# Generated by Django 4.0 on 2022-02-20 18:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0004_categorymapping_categorymapping_mapping_unique'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryMappingProxy',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('questionnaire.categorymapping',),
        ),
        migrations.CreateModel(
            name='CategoryProxy',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('questionnaire.category',),
        ),
        migrations.RenameField(
            model_name='categorymapping',
            old_name='category_id',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='categorymapping',
            old_name='questionnaire_id',
            new_name='questionnaire',
        ),
    ]
