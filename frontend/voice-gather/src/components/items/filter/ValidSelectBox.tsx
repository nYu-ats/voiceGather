import {VFC, ReactNode} from "react";
import styled from 'styled-components';
import { RadioInputBox } from "../../elements/input/RadioInput";
import { Label } from "../../elements/label/Label";

const StyledDiv = styled.div`
width: 100%;
padding: .5em;
`

export const ValidSelectBox :VFC = ()=>{
    return(
        <StyledDiv style={{width:"100%", padding:".5em 0 0 .5em"}}>
            <Label label="投稿日"/>
            <StyledDiv>
                <RadioInputBox label="全て"/>
                <RadioInputBox label="回答可能のみ"/>
            </StyledDiv>
        </StyledDiv>
    );
}