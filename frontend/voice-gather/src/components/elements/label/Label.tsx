import {VFC, ReactNode} from "react";
import styled from 'styled-components';

const StyledLabel = styled.label`
font-weight: bold;
color: #666;
line-height:1em;
`

export type StyledLabelProps ={
    label:string;
    style?:Style;
}

type Style = {
    fontSize?: string;
    fontWeight?: string;
}

export const Label:VFC<StyledLabelProps> = (props) => {
    return <StyledLabel style={{...props.style}}>{props.label}</StyledLabel>
}