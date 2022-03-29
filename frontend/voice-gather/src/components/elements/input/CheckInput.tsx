import { VFC, ReactNode } from "react";
import styled from 'styled-components';
import { Label } from "../label/Label";

const StyledInput = styled.input`
margin:auto .25em auto 0;
`

export type RadioInputProps = {
    label?:string;
}

export const CheckInputBox: VFC<RadioInputProps> = (props) => {
    return (
        <div>
            <StyledInput type="checkbox" />
            {props.label ? <Label label={props.label} style={{fontSize:".75em", fontWeight:"lighter"}}/>: null}
        </div>
);
}