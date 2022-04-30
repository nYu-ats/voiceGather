import {VFC} from 'react';
import { Link } from "../../elements/link/Link";
import { SimpleListQuestionnaireItem, QuestionnaireOverview } from '../../items/questionnaire/SimpleListQuestionnaire';

export type CategorizedQuestionnaireContainerProps = {
    data:Array<CategorizedQuestionnaire>;
}

export type CategorizedQuestionnaire = {
    category: string;
    data?: Array<QuestionnaireOverview>;
}

export const CategorizedQuestionnaireContainer: VFC<CategorizedQuestionnaireContainerProps> = (props) => {
    return (
    <div style={{width:"100%", padding:"1rem", boxSizing:"border-box"}}>
        <div style={{margin:"1rem", borderBottom:"1px solid #eaedf7"}}>
            <h2>ピックアップ</h2>
        </div>
        <div style={{display:"flex", justifyContent:"left", flexWrap:"wrap"}}>
        {props.data.map((categorized)=>{
            return (
                <div style={{margin:"1rem", width:"45%"}}>
                    <h3 style={{borderBottom:"2px solid #d9aacd"}}>{categorized.category}</h3>
                    {categorized.data?.map((item, index)=>{
                        return(
                        <SimpleListQuestionnaireItem 
                        data={item}
                        />
                        );
                    })}
                    <div style={{textAlign:"right"}}>
                        <Link linkStyle={{width:"100%", color:"#6699ff", hoverColor:"#6666ff"}}>もっとみる ＞＞</Link>
                    </div>
                </div>    
            )
        })}
        </div>
    </div>
    );
}