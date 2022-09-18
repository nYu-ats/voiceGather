import { VFC } from "react";
import styled from 'styled-components';
import { BaseIconProps } from "./BaseIcon";

export const StyledSVG = styled.svg<{
    color?:string,
    hoverColor?:string;
}>`
fill: ${(props) => ( props.color ? props.color : "#666")};
transition: .3s;
&:hover{
    cursor: pointer;
    fill: ${(props) => ( props.hoverColor ? props.hoverColor : "black")};
}
`

export const MenuLeftIcon:VFC<BaseIconProps> = (props) => {
    return(
        <StyledSVG version="1.1" width="24" height="24" viewBox="0 0 24 24" color={props.color} hoverColor={props.hoverColor}>
            <path  d="M14,7L9,12L14,17V7Z"/>
        </StyledSVG>
    );
}