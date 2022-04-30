import React, { useState, useEffect } from 'react';
import { QuestionnaireOverview } from "../components/items/questionnaire/BicolorListQuestionnaireItem";
import { SimpleQuestionnaireContainer } from '../components/blocks/questionnaire/SimpleQuestionnaireContainer';
import { CategorizedQuestionnaireContainer, CategorizedQuestionnaire } from '../components/blocks/questionnaire/CategorizedQuestionnaireContainer';
import { formatDate } from '../utils/DateUtil';
import { TrendKeywordContainer, TrendKeyword } from '../components/blocks/trend/TrendContainer';
import { SimpleTemplate } from '../template/SimpleTemplate';
import { getQuestionnaire, getCategorizedQuestionnaire } from '../features/questionnaire/getQuestionnaire';
import { getKeyword } from '../features/keyword/getKeyword';
import { getCategory } from '../features/category/getCategory';

export const Top = () => {

  const today = new Date();
  today.setDate(today.getDate() - 7);

  const [hotQuestionnaires, setHot] = useState<Array<QuestionnaireOverview>>([]);
  const [categorizedQuestionnaire, setCatgorized] = useState<Array<CategorizedQuestionnaire>>(
    []
  );
  const [trends, setTrend] = useState<Array<TrendKeyword>>([]);

  const initContents = async () => {
    const selectedQuestionnaire = await getQuestionnaire({
      order:"desc",
      orderBy:"answer_count",
      startDate:formatDate(today),
      answerable:true,
      size:20
    });
    setHot(selectedQuestionnaire);

    const categories = await getCategory({
      order: 'desc',
      orderBy: 'count',
      size: 8
    });

    const categorizedQuestionnaire = await getCategorizedQuestionnaire({
      order:"desc",
      orderBy:"answer_count",
      startDate:formatDate(today),
      answerable:true,
      size:5,
    }, categories.map((data) => {return data.name}));
    setCatgorized(categorizedQuestionnaire);

    let trend = [];
    trend.push(await getKeyword({order: 'desc', orderBy:'count', isFastRising:false, size:20}, '人気'))
    trend.push(await getKeyword({order: 'desc', orderBy:'count', isFastRising:true, size:20}, '急上昇'));
    trend.push(await getKeyword({order: 'desc', orderBy:'created_at', isFastRising:false, size:20}, '新着'));
    setTrend(trend);
  }

  useEffect(() => {
    initContents();
  }, []);

    return (
      <SimpleTemplate useFooter={false}>
          <div style={{width: "75vw",marginRight: ".5em"}}>
            <div style={{width:"100%", backgroundColor:"white", borderRadius: "4px", marginBottom:"1em"}}>
              <CategorizedQuestionnaireContainer data={categorizedQuestionnaire}/>
            </div>
            <div style={{width:"100%", backgroundColor:"#fafafa", borderRadius: "4px", marginBottom:"1em"}}>
              <TrendKeywordContainer trend={trends} />
            </div>
            <div style={{width:"100%", backgroundColor:"white", borderRadius: "4px"}}>
              <SimpleQuestionnaireContainer data={hotQuestionnaires} head="今日の注目アンケート"/>
            </div>
          </div>
      </SimpleTemplate>
    )
  }