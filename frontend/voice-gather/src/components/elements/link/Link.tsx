import { VFC, ReactNode } from "react";
import styled from 'styled-components';

const StyledLink = styled.a`
color: #666;
font-wight:bold;
font-weight: bold;
&:hover {
    cursor: pointer;
    textDecoration: none;
    color: black;
}
`

export type LinkProps = {
    children: ReactNode;
    linkStyle: LinkStyle;
}

export type LinkStyle = {
    width: string;
    height: string;
    margin: string;
}

export const Link: VFC<LinkProps> = (props) => {

    return <StyledLink style={props.linkStyle}>{props.children}</StyledLink>;
}