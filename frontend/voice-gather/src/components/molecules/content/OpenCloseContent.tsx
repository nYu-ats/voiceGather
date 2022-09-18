import { MouseEventHandler, ReactNode, VFC } from "react"
import styled from 'styled-components';
import { ListItem } from "../../atoms/listItem/ListItem";
import { ArrowIcon } from "../../icons/ArrowIcon";


const StyledDiv = styled.div<{
    hoverBackgroundColor?: string
}>`
display: flex;
justify-content: space-between;
background-color: transparent;
transition: .3s;
&:hover{
    cursor:pointer;
    background-color:${(props) => (props.hoverBackgroundColor ? props.hoverBackgroundColor : "#9999ff")};
}
`

export type OpenCloseContentProps = {
    children: ReactNode;
    contentName: string;
    height: string;
    isOpen: boolean;
    onClick: MouseEventHandler<HTMLElement>;
}

export const OpenCloseContent: VFC<OpenCloseContentProps> = (props) => {
    return (
        <div>
            <StyledDiv
                hoverBackgroundColor='#fafafa'
                onClick={props.onClick}>
                <p style={{
                    margin: '0 1rem',
                    lineHeight: '1.5rem',
                    fontWeight: 'lighter',
                    color: '#666'
                }}>{props.contentName}</p>
                <div style={{
                    transition: '.3s',
                    transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                    <ArrowIcon color="#666" />
                </div>
            </StyledDiv>
            <div style={{
                backgroundColor: "#fafafa",
                padding: '0 .5em',
                display: 'block',
                overflow: 'hidden',
                maxHeight: props.isOpen ? String(Number(props.isOpen) * 100) + '%' : '0',
            }}>
                {props.children}
            </div>
        </div>
    );
}