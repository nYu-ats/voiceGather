import { VFC, ReactNode } from "react";
import styled from "styled-components";
import { Link } from "../../elements/link/Link";
import { ListItem } from "../../elements/listItem/ListItem";

const StyledDiv = styled.div`
padding: .5em;
transition: all .3s;
&:hover {
    box-shadow: 0px 1px 6px rgba(0,0,0,0.3);
    position:relative;
`

export type QuestionnaireItemProps = {
    heighLight: boolean;
    data:QuestionnaireOverview;
}

export type QuestionnaireOverview={
    title: string;
    overview:string;
    startDate:string;
    endDate:string;
    createdAt: Date;
    answerCount: number;
    category:Array<string>;
    isDisplay: boolean;
}

export const BicolorListQuestionnaireItem : VFC<QuestionnaireItemProps> = (props) =>{
    return (
        <Link linkStyle={{width:"100%", height:"auto"}}>
            <StyledDiv style={props.heighLight ? {backgroundColor:"white"} : {backgroundColor:"#e8ecef"}}>
                <div style={{fontSize:".75em", fontWeight:"normal", margin:"4px 0"}}>
                    <span style={{fontWeight:"bold"}}>募集期間: </span>{props.data.startDate} ~ {props.data.endDate}
                </div>
                <div>
                    <h3 style={{margin:"4px 0", fontSize:"1em", lineHeight:"1em"}}>{props.data.title}</h3>
                    <p style={{margin:"4px 0" ,fontWeight:"normal", fontSize:".75em"}}>{props.data.overview}</p>
                </div>
                <div style={{margin:"4px 0"}}>
                    <ul style={{display:"flex", justifyContent:"left", margin:"0", padding:"0"}}>
                    {props.data.category.map((value)=>{
                        return(
                            <ListItem>
                                <div style={{
                                        marginRight:"4px", 
                                        fontSize:".75em", 
                                        borderRadius:".75em", 
                                        backgroundColor:"#d9aacd", 
                                        padding:".25em .5em", 
                                        lineHeight:".75em", 
                                        color:"white"}}>
                                    {value}
                                </div>
                            </ListItem>
                        );
                    })}
                    </ul>
                </div>
            </StyledDiv>
        </Link>
    );
}