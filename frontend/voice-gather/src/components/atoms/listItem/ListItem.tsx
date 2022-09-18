import { VFC, ReactNode } from "react";
import styled from 'styled-components';

const StyledListItem = styled.li<{
    listStyle?:string, listType?:string
}>`
color: #666;
list-style:${(props) => ( props.listStyle ? props.listStyle : "none")};
list-style-type:${(props) => ( props.listType ? props.listType : "none")};
`

export type ListItemProps = {
    listType?:string;
    listStyle?:string;
    children: ReactNode;
}

export const ListItem: VFC<ListItemProps> = (props)=> {
    return <StyledListItem listStyle={props.listStyle} listType={props.listType}>{props.children}</StyledListItem>
}