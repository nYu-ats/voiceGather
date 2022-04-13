import { VFC, ReactNode } from "react";
import styled from 'styled-components';

const StyledLink = styled.a<{
    color?:string, hoverColor?:string, align?:string, width?:string, height?:string}>`
color: ${(props) => ( props.color ? props.color : "#666")};
width: ${(props) => ( props.width ? props.width : "auto")};
height: ${(props) => ( props.height ? props.height : "auto")};
font-weight: bold;
&:hover {
    cursor: pointer;
    textDecoration: none;
    color: ${(props) => ( props.hoverColor ? props.hoverColor : "black")};
}
`

export type LinkProps = {
    children: ReactNode;
    linkStyle: LinkStyle;
}

export type LinkStyle = {
    width?: string;
    height?: string;
    color?: string;
    hoverColor?: string;
}

export const Link: VFC<LinkProps> = (props) => {

    return <StyledLink 
    color={props.linkStyle.color} 
    hoverColor={props.linkStyle.hoverColor}
    width={props.linkStyle.width}
    height={props.linkStyle.height}>{props.children}</StyledLink>;
}