import { VFC, ReactNode } from "react";
import styled from 'styled-components';

const StyledListItem = styled.li`
list-style:none;
`

export type ListItemProps = {
    children: ReactNode;
}

export const ListItem: VFC<ListItemProps> = (props)=> {
    return <StyledListItem>{props.children}</StyledListItem>
}