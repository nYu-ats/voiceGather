import { TextInput } from "../elements/input/TextInput"
import { CloseButton } from "../elements/button/CloseButton"
import styled from 'styled-components';
import Image from "../../images/1021.png"

const StyledKeywordSearchForm = styled.form`
display: flex;
background-color: white;
align-items: center;
padding: .5em;
margin: 0 1em;
`

const IconStyle = {
    width: "16px",
    height: "16px",
}

export const KeywordSearchForm = () => {
    return (
        <StyledKeywordSearchForm>
            <img src={Image} width={IconStyle.width} height={IconStyle.height}/>
            <TextInput inputStyle={{placeHolder: "アンケート検索"}}/>
            <CloseButton/>
        </StyledKeywordSearchForm>
    )
}
