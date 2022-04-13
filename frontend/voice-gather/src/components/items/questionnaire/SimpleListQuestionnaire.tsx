import { VFC } from "react";
import styled from "styled-components";
import { Link } from "../../elements/link/Link";

const StyledDiv = styled.div`
padding: .5em;
transition: all .3s;
&:hover {
    box-shadow: 0px 1px 6px rgba(0,0,0,0.3);
    position:relative;
`

export type QuestionnaireItemProps = {
    data:QuestionnaireOverview;
}

export type QuestionnaireOverview={
    title: string;
    overview:string;
    startDate:string;
    endDate:string;
}

export const SimpleListQuestionnaireItem : VFC<QuestionnaireItemProps> = (props) =>{
    return (
        <Link linkStyle={{width:"100%", height:"auto"}}>
            <StyledDiv>
                <div style={{fontSize:".75em", fontWeight:"normal", margin:"4px 0"}}>
                    <span style={{fontWeight:"bold"}}>募集期間: </span>{props.data.startDate} ~ {props.data.endDate}
                </div>
                <div>
                    <h3 style={{margin:"4px 0", fontSize:"1em", lineHeight:"1em"}}>{props.data.title}</h3>
                    <p style={{margin:"4px 0" ,fontWeight:"normal", fontSize:".75em"}}>{props.data.overview}</p>
                </div>
            </StyledDiv>
        </Link>
    );
}