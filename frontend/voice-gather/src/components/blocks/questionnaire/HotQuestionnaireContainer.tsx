import {VFC} from "react";
import { BicolorListQuestionnaireItem, QuestionnaireOverview } from "../../items/questionnaire/BicolorListQuestionnaireItem";

export type LinkQuestionnaireContainerProps = {
    data?: Array<QuestionnaireOverview>;
}

export const HotQuestionnaireContainer: VFC<LinkQuestionnaireContainerProps> = (props) => {
    return (
    <div style={{width:"100%", padding:"1rem", boxSizing:"border-box"}}>
        <div style={{margin:"1rem", borderBottom:"1px solid #eaedf7"}}>
            <h2>今日の注目アンケート</h2>
        </div>
        <div style={{margin:"1rem"}}>
            {props.data?.map((item, index)=>{
                return(
                <BicolorListQuestionnaireItem 
                heighLight={index % 2===0?true:false}
                data={item}
                />
                );
            })}
        </div>
    </div>
    );
}