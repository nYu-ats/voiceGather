import {VFC, ReactNode} from "react";
import styled from 'styled-components';

export type BaseIconProps = {
    color?:string;
    hoverColor?:string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

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

export const RefreshIcon:VFC<BaseIconProps> = (props) => {
    return(
        <StyledSVG version="1.1" width="24" height="24" viewBox="0 0 24 24" color={props.color} hoverColor={props.hoverColor}>
            <path  d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
        </StyledSVG>
    );
}