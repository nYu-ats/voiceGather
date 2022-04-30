import {VFC, ReactNode} from "react";
import styled from 'styled-components';

const StyledButton = styled.button<{
    backgroundColor?:string, hoverBackgroundColor?:string, color?:string
}>`
padding:.5em 1em;
border:none;
background-color:${(props) => ( props.backgroundColor ? props.backgroundColor : "#7070ff")};
border-radius:4px;
color: ${(props) => ( props.color ? props.color : "white")};
font-weight:bold;
&:hover{
    cursor:pointer;
    background-color:${(props) => ( props.hoverBackgroundColor ? props.hoverBackgroundColor : "#9999ff")};
}
`

export type SimpleButtonProps={
    label:string;
    backgroundColor?:string;
    hoverBackgroundColor?:string;
    color?:string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const SimpleButton: VFC<SimpleButtonProps> = (props) => {
    return (
    <StyledButton 
    type="submit"
    backgroundColor={props.backgroundColor}
    hoverBackgroundColor={props.hoverBackgroundColor}
    color={props.color}
    onClick={props.onClick}>
        {props.label}
    </StyledButton>);
}