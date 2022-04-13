import React, { useState, useEffect } from 'react';
import { BasePage } from './BasePage';
import { GetQuestionnare } from '../services/Questionnaire';
import { QuestionnaireOverview } from "../components/items/questionnaire/BicolorListQuestionnaireItem";
import { HotQuestionnaireContainer } from '../components/blocks/questionnaire/HotQuestionnaireContainer';
import { CategorizedQuestionnaireContainer, CategorizedQuestionnaire } from '../components/blocks/questionnaire/CategorizedQuestionnaireContainer';
import { FilterBox } from '../components/blocks/filterBox/FilterBox';
import { formatDate } from '../utils/DateUtil';
import { TrendKeywordContainer } from '../components/blocks/trend/TrendContainer';

export const Top = () => {

  const today = new Date();
  today.setDate(today.getDate() - 7);

  const [hotQuestionnaires, setHot] = useState<Array<QuestionnaireOverview>>([]);
  const [categorizedQuestionnaire, setCatgorized] = useState<Array<CategorizedQuestionnaire>>(
    []
  );

  const loadSelectedQuestionnaire = async () => {
    let response = await GetQuestionnare({
      order:"desc",
      orderBy:"answer_count",
      startDate:formatDate(today),
      answerable:true,
      upperLimit:10
    });
    
    let questionnaires:Array<QuestionnaireOverview> = response.map((data) => {
      return ({
        title: data.title,
        overview: data.overview,
        startDate: data.startDate,
        endDate: data.endDate,
        category: data.category,
      });
    });

    setHot(questionnaires);
  }

  const loadCategorizedQuestionnaire = async (category:Array<string>) => {
    let data = category.map(async (category)=>{
      let response = await GetQuestionnare({
        order:"desc",
        orderBy:"answer_count",
        startDate:formatDate(today),
        answerable:true,
        upperLimit:5,
        category:[category]
      });

      let questionnaires : Array<QuestionnaireOverview> = response.map((data) => {
        return ({
          title: data.title,
          overview: data.overview,
          startDate: data.startDate,
          endDate: data.endDate,
          category: data.category,
        });
      })  

      console.log(category);
      return {
        category: category,
        data: questionnaires,
      }
    });

    let result = await Promise.all(data);

    setCatgorized(result);
  };

  const loadQuestionnaires = async () => {
    const selected = loadSelectedQuestionnaire();

    const categories = [
      "ライフスタイル",
      "趣味",
      "アニメ",
      "その他",
      "スポーツ",
      "ファイナンス",
      "食事",
      "家電",
    ];

    const categorized = loadCategorizedQuestionnaire(categories);

    await Promise.all([categorized, selected]);
  }

  useEffect(() => {
    loadQuestionnaires();
  }, []);

    return (
      <BasePage useFooter={false}>
        <div style={{
          backgroundColor:"#eaedf7",
          width: "95vw",padding:"16px 2.5vw"}}>
          <div style={{display:"flex", flexWrap:"nowrap", justifyContent:"space-between"}}>
            <div style={{width: "75vw",marginRight: ".5em"}}>
              <div style={{width:"100%", backgroundColor:"white", borderRadius: "4px", marginBottom:"1em"}}>
                <CategorizedQuestionnaireContainer data={categorizedQuestionnaire}/>
              </div>
              <div style={{width:"100%", backgroundColor:"#e8ecef", borderRadius: "4px", marginBottom:"1em"}}>
                <TrendKeywordContainer data={
                  [
                    {week: "2022年3月", data:["さばみそ", "おこめ"]},
                    {week: "2022年4月", data:["さばみそ", "おこめ"]},
                    {week: "2022年5月", data:["さばみそ", "おこめ"]},
                  ]
                } />
              </div>
              <div style={{width:"100%", backgroundColor:"white", borderRadius: "4px"}}>
                <HotQuestionnaireContainer data={hotQuestionnaires} />
              </div>
            </div>
            <FilterBox data={[{name:"サンプル", url:"#"}]}/>
          </div>
        </div>
      </BasePage>
    )
  }