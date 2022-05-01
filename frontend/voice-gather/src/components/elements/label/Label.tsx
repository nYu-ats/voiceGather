import {VFC, ReactNode} from "react";
import styled from 'styled-components';

const StyledLabel = styled.label`
color: #666;
line-height:1em;
font-weight: bold;
`

export type StyledLabelProps ={
    label:string;
    style?:Style;
}

type Style = {
    fontWeight?: string;
    fontSize?: string;
}

export const Label:VFC<StyledLabelProps> = (props) => {
    return <StyledLabel style={{...props.style}}>{props.label}</StyledLabel>
}