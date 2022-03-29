import {VFC, ReactNode} from "react";
import styled from 'styled-components';

const StyledButton = styled.button`
padding:.5em 1em;
border:none;
background-color:#7070ff;
border-radius:4px;
color:white;
font-weight:bold;
&:hover{
    cursor:pointer;
    background-color:#9999ff;
}
`

export type SimpleButtonProps={
    label:string;
}

export const SimpleButton: VFC<SimpleButtonProps> = (props) => {
    return (<StyledButton type="submit">{props.label}</StyledButton>);
}