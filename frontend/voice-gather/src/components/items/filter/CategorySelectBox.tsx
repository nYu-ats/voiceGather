import {VFC, ReactNode} from "react";
import styled from 'styled-components';
import { ListItem } from "../../elements/listItem/ListItem";
import { Link } from "../../elements/link/Link"
import { Label } from "../../elements/label/Label";
import { CheckInputBox } from "../../elements/input/CheckInput";

const StyledDiv = styled.div`
padding: .5em;
border-radius: 4px;
`

const categoryItemStyle = {
    width: 'auto',
    height: 'auto',
    margin: '1em',
}

type CategoryProps = {
    categoryList: Array<Category>;
}

type Category = {
    name: string;
    url: string;
}

const LinkGenerator = (categoryList:Array<Category>) => {
    return (
        categoryList.map((item) => {
            return(
                <ListItem>
                    <div style={{display:"flex"}}>
                    <CheckInputBox/>
                    <p style={{margin:"0", lineHeight:"1.2em"}}>{item.name}</p>
                    </div>
                </ListItem>
            )
        })
    )
}

export const CategorySelectBox: VFC<CategoryProps> = (props) => {
    return (
        <div style={{width:"100%", padding:".5em 0 0 .5em"}}>
            <Label label="カテゴリ"/>
            <StyledDiv>
                <ul style={{padding:"0", margin:"0"}}>
                    {LinkGenerator(props.categoryList)}
                </ul>
            </StyledDiv>
        </div>
        )

}