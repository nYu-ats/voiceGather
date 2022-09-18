import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { GlobalNav } from "../navigation/GlobalNav";
import { ImageLink } from "../../atoms/link/ImageLink"
import { KeywordSearchForm } from "../../molecules/formItem/KeywordSearchForm";
import { GlobalInfo } from "../navigation/GlobalInfo"
import Image from "../../../images/logo.png"
import queryString from 'query-string';
import { Path } from '../../../resource/Path';

const StyledHeader = styled.div`
width: 100vw;
height: 85px;
padding: 0;
position: sticky;
top:0;
background-color:white;
z-index:100;
`

export const Header = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const searchByKeyword: React.MouseEventHandler<HTMLButtonElement> = async (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(Path.page + '?' + queryString.stringify({ keyword: [keyword] }))
    };

    const toTopPage: React.MouseEventHandler<HTMLElement> = () => {
        navigate(Path.top);
    }

    return (
        <StyledHeader>
            <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", width: "90vw", padding: "0 5vw" }}>
                <ImageLink
                    imageSrc={Image}
                    imageStyle={{ width: "100px", height: "50px" }}
                    linkStyle={{ width: "100px", height: "50px" }}
                    anchorTo={toTopPage} />
                <GlobalNav />
            </div>
            <div style={{ borderTop: "2px solid #eaedf7", borderBottom: "2px solid #eaedf7" }}>
                <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", width: "90vw", padding: "0 5vw" }}>
                    <GlobalInfo></GlobalInfo>
                    <KeywordSearchForm onChange={changeKeyword} onSubmit={searchByKeyword} />
                </div>
            </div>
        </StyledHeader>
    )
}
