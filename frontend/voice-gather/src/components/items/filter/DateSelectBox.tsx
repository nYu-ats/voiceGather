import {VFC, ReactNode} from "react";
import styled from 'styled-components';
import { DateInputBox } from "../../elements/input/DateInputBox";
import { Label } from "../../elements/label/Label";

const StyledDiv = styled.div`
width: 100%;
padding: .5em;
`

export const DateSelectBox :VFC = () =>{
    return(
        <StyledDiv style={{width:"100%", padding:".5em 0 0 .5em"}}>
            <Label label="投稿日"></Label>
            <StyledDiv>
                <DateInputBox label="から" />
                <DateInputBox label="まで" />
            </StyledDiv>
        </StyledDiv>
    )
}