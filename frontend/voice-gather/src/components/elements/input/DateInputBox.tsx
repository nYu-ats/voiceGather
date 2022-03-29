import { VFC, ReactNode } from "react";
import styled from 'styled-components';
import { Label } from "../label/Label";

const StyledInput = styled.input`
margin-right:1em;
`

export type DateInputProps = {
    label?:string;
}

export const DateInputBox: VFC<DateInputProps> = (props) => {
    return (
        <div style={{width:"100%", boxSizing:"border-box", padding:".5em 0"}}>
            <StyledInput type="date" />
            {props.label ? <Label label={props.label} style={{fontSize:".75em", fontWeight:"lighter"}}/>: null}
        </div>
);
}