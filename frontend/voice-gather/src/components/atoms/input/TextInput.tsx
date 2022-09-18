import { VFC } from "react";
import styled from 'styled-components';

const StyledInput = styled.input`
background-color: white;
outline: none;
border: none;
box-sizing: border-box;
margin: 0 1em;
`

export type TextInputProps = {
    inputStyle: TextInputStyle;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export type TextInputStyle = {
    placeHolder: string;
}

export const TextInput: VFC<TextInputProps> = (props) => {

    return <StyledInput onChange={props.onChange} placeholder={props.inputStyle.placeHolder}></StyledInput>
}