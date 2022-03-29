import { VFC, ReactNode } from "react";
import styled from "styled-components";
import { Link } from "../../elements/link/Link";
import { ListItem } from "../../elements/listItem/ListItem";

export type QuestionnaireItemProps = {
    heighLight: boolean;
}

export const ListQuestionnaireItem : VFC<QuestionnaireItemProps> = (props) =>{
    return (
        <Link linkStyle={{width:"100%", height:"auto", margin:"auto"}}>
            <div style={props.heighLight ? {backgroundColor:"white", padding:".5em"} : {backgroundColor:"#e8ecef", padding:".5em"}}>
                <div style={{fontSize:".75em", fontWeight:"normal", margin:"4px 0"}}>
                    <span style={{fontWeight:"bold"}}>募集期間: </span>2022-03-22 ~ 2022-04-22
                </div>
                <div>
                    <h3 style={{margin:"4px 0"}}>title</h3>
                    <p style={{margin:"4px 0" ,fontWeight:"normal"}}>overview</p>
                </div>
                <div style={{margin:"4px 0"}}>
                    <ul style={{display:"flex", justifyContent:"left", margin:"0", padding:"0"}}>
                        <ListItem><div style={{marginRight:"4px", fontSize:".75em", borderRadius:".75em", backgroundColor:"#d9aacd", padding:".25em .5em", lineHeight:".75em", color:"white"}}>category1</div></ListItem>
                        <ListItem><div style={{marginRight:"4px", fontSize:".75em", borderRadius:".75em", backgroundColor:"#d9aacd", padding:".25em .5em", lineHeight:".75em", color:"white"}}>category2</div></ListItem>
                        <ListItem><div style={{marginRight:"4px", fontSize:".75em", borderRadius:".75em", backgroundColor:"#d9aacd", padding:".25em .5em", lineHeight:".75em", color:"white"}}>category3</div></ListItem>
                    </ul>
                </div>
            </div>
        </Link>
    );
}