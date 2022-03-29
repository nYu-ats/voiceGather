import { VFC, ReactNode } from "react";
import { Header } from '../components/blocks/header/Header';

type Props = {
    children: ReactNode;
    useFooter: boolean;
}

export const BasePage: VFC<Props> = (props) => {
    return (
        <>
        <Header/>
        {props.children}
        {<footer></footer> ? props.useFooter : <></>}
        </>
    )
}