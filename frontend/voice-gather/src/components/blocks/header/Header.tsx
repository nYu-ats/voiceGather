import { VFC, ReactNode } from "react";
import styled from 'styled-components';
import { GlobalNav } from "../../items/GlobalNav";
import { ImageLink } from "../../elements/link/ImageLink"
import { KeywordSearchForm } from "../../items/KeywordSearchForm";
import { GlobalInfo } from "../../items/GlobalInfo"
import Image from "../../../images/logo.png"

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

    return (
        <StyledHeader>
            <div style={{display:"flex", flexWrap:"nowrap", justifyContent:"space-between", width:"90vw", padding:"0 5vw"}}>
                <ImageLink 
                    imageSrc={Image} 
                    imageStyle={{width:"100px", height:"50px"}} 
                    linkStyle={{width:"100px", height:"50px"}}/>
                <GlobalNav/>
            </div>
            <div style={{borderTop:"2px solid #eaedf7", borderBottom:"2px solid #eaedf7"}}>
                <div style={{display:"flex", flexWrap:"nowrap",justifyContent:"space-between", width:"90vw", padding:"0 5vw"}}>
                    <GlobalInfo></GlobalInfo>
                    <KeywordSearchForm/>
                </div>
            </div>
        </StyledHeader>
    )
}
