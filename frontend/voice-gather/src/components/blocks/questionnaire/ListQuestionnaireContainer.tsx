import {VFC, ReactNode} from "react";
import styled from 'styled-components';
import { ListQuestionnaireItem } from "../../items/questionnaire/ListQuestionnaireItem";

const StyledDiv = styled.div`
width:100%;
padding:1rem;
box-sizing: border-box;
`

export type LinkQuestionnaireContainerProps = {
    data:  Array<QuestionnaireOverview>;
}

export type QuestionnaireOverview={
    title: string;
    overview:string;
    startDate:string;
    endDate:string;
    cateogry:Array<string>;
}

export const ListQuestionnaireContainer: VFC<LinkQuestionnaireContainerProps> = (props) => {
    return (
    <StyledDiv>
        <div>
            <h1>Hot</h1>
        </div>
        <div style={{margin:"1rem"}}>
            <ListQuestionnaireItem heighLight={true}/>
            <ListQuestionnaireItem heighLight={false}/>
        </div>
    </StyledDiv>
    );
}