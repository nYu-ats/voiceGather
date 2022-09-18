import { VFC } from 'react';
import { TextInput } from "../../atoms/input/TextInput"
import styled from 'styled-components';
import { IconButton } from "../../atoms/button/IconButton";
import { SearchIcon } from "../../icons/SearchIcon";

export type KeywordSearchFormProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledKeywordSearchForm = styled.form`
display: flex;
background-color: white;
align-items: center;
padding: .3em;
margin: 0;
`

export const KeywordSearchForm: VFC<KeywordSearchFormProps> = (props) => {
    return (
        <StyledKeywordSearchForm>
            <TextInput onChange={props.onChange} inputStyle={{placeHolder: "アンケート検索"}}/>
            <IconButton icon={<SearchIcon/>} onClick={props.onSubmit}/>
        </StyledKeywordSearchForm>
    )
}
