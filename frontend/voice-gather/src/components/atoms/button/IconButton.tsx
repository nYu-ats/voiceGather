import {VFC, ReactNode} from "react";
import styled from "styled-components";

export type SimpleButtonProps={
    icon:ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button
`
border: none;
background-color: white;
`

export const IconButton: VFC<SimpleButtonProps> = (props) => {
    return (
    <StyledButton 
    type="submit"
    onClick={props.onClick}>
        {props.icon}
    </StyledButton>);
}