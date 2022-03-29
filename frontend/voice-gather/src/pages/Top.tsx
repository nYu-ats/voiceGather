import React  from 'react';
import { BasePage } from './BasePage';
import { GetData } from '../services/Api';
import urls from '../constants/Requests';
import { QuestionnaireQuery } from '../models/ParameterModels';
import { ListQuestionnaireContainer } from '../components/blocks/questionnaire/ListQuestionnaireContainer';
import { FilterBox } from '../components/blocks/filterBox/FilterBox';

export const Top = () => {
  let param: QuestionnaireQuery = {}

  let questionnaires = GetData(
    urls.QuestionnaireList,
    param
    );

  console.log(questionnaires);

    return (
      <BasePage useFooter={false}>
        <div style={{
          backgroundColor:"#eaedf7",
          width: "95vw",
          height:"100vh",padding:"16px 2.5vw"}}>
          <div style={{display:"flex", flexWrap:"nowrap", justifyContent:"space-between"}}>
            <div style={{width: "75vw",height: "100vh",marginRight: ".5em",backgroundColor:"white",borderRadius: "4px"}}>
              <ListQuestionnaireContainer></ListQuestionnaireContainer>            
            </div>
            <FilterBox data={[{name:"サンプル", url:"#"}]}/>
          </div>
        </div>
      </BasePage>
    )
  }