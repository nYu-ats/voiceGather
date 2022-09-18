import { useState, useEffect } from 'react';
import { SimpleQuestionnaireContainer } from '../../components/organisms/questionnaire/SimpleQuestionnaireContainer';
import { CategorizedQuestionnaireContainer } from '../../components/organisms/questionnaire/CategorizedQuestionnaireContainer';
import { formatDate } from '../../features/utility/DateUtil';
import { TrendKeywordContainer } from '../../components/organisms/trend/TrendContainer';
import { TopTemplate } from '../../template/Top.template';
import CategoryService from "../../services/category/CategoryService";
import KeywordService from "../../services/keyword/KeywordService";
import QuestionnaireService from '../../services/questionnaire/QuestionnaireService';
import { CategorizedQuestionnaire, QuestionnaireOverview, TrendKeyword } from './Top.type';
import queryString from 'query-string';
import { Path } from '../../resource/Path';
import { GetKeywordListParameter } from '../../services/keyword/KeywordService.type';

export const Top = () => {

  const today = new Date();
  today.setDate(today.getDate() - 7);

  const [hotQuestionnaires, setHot] = useState<Array<QuestionnaireOverview>>([]);
  const [categorizedQuestionnaire, setCatgorized] = useState<Array<CategorizedQuestionnaire>>([]);
  const [trends, setTrend] = useState<Array<TrendKeyword>>([]);

  const initContents = async () => {
    const hotQuestionnaire = await QuestionnaireService.getList({
      order: "desc",
      orderBy: "answer_count",
      startAt: formatDate(today),
      answerable: true,
      size: 20
    });
    setHot(hotQuestionnaire.map((item) => {
      return {
        ...item,
        questionnairePageUrl: Path.questionnaire + '/' + item.id
      }
    }));

    const categories = await CategoryService.getList({
      order: 'desc',
      orderBy: 'count',
      size: 8
    });
    const categorizedQuestionnaire = await QuestionnaireService.getCategorizedList({
      order: "desc",
      orderBy: "answer_count",
      startAt: formatDate(today),
      answerable: true,
      size: 5,
    }, categories.map((data) => { return data.name }));
    setCatgorized(categorizedQuestionnaire.map((item) => {
      return {
        category: item.category,
        cateogryPageUrl: Path.page + '?' + queryString.stringify({ category: [item.category] }),
        data: item.data.map((item) => {
          return {
            ...item,
            questionnairePageUrl: Path.questionnaire + '/' + item.id
          }
        })
      }
    }));

    let trend = [];

    trend.push(await collectTrendKeywords('人気', {
      order: 'desc',
      orderBy: 'count',
      isFastRising: false,
      size: 20
    }));
    trend.push(await collectTrendKeywords('急上昇', {
      order: 'desc',
      orderBy: 'count',
      isFastRising: false,
      size: 20
    }));
    trend.push(await collectTrendKeywords('新着', {
      order: 'desc',
      orderBy: 'created_at',
      isFastRising: false,
      size: 20
    }));
    setTrend(trend);
  }

  const collectTrendKeywords = async (title: string, params: GetKeywordListParameter) => {
    const keywords = await KeywordService.getList(params);

    return {
      title: '新着',
      data: keywords.map((item) => {
        return {
          keyword: item,
          keywordPageUrl: Path.page + '?' + queryString.stringify({ keyword: [item] })
        }
      })
    }
  }

  useEffect(() => {
    initContents();
  }, []);

  const categorizedContent = <CategorizedQuestionnaireContainer data={categorizedQuestionnaire} />;
  const trendKeywordContent = <TrendKeywordContainer trend={trends} />;
  const simpleContent = <SimpleQuestionnaireContainer data={hotQuestionnaires} head="今日の注目アンケート" />

  return (
    <TopTemplate
      useFooter={false}
      categorizedQuestionnaire={categorizedContent}
      trendKeyword={trendKeywordContent}
      simpleQuestionnaire={simpleContent} />
  )
}