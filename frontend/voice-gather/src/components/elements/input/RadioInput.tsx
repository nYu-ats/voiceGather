import { VFC, ReactNode } from "react";
import styled from 'styled-components';
import { Label } from "../label/Label";

const StyledInput = styled.input`

`

export type RadioInputProps = {
    label:string;
}

export const RadioInputBox: VFC<RadioInputProps> = (props) => {
    return (
        <div>
            <input type="radio" />
            <Label label={props.label}/>
        </div>
);
}