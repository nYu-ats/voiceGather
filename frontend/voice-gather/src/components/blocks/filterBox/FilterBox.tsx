import {VFC, ReactNode} from "react";
import { CategorySelectBox } from '../../items/filter/CategorySelectBox';
import { DateSelectBox } from '../../items/filter/DateSelectBox';
import { ValidSelectBox } from '../../items/filter/ValidSelectBox';
import { SimpleButton } from "../../elements/button/SimpleButton";

export type CategoryArray = {
    data: Array<Category>;
}

export type Category = {
    name: string;
    url: string;
}

export const FilterBox:VFC<CategoryArray> = (props) => {
    return (
        <form style={{width: "20vw", height:"100vh", backgroundColor:"white", borderRadius:"4px"}}>
            <div style={{width:"100%", padding:".5em"}}>
                <SimpleButton label="Search"/>
            </div>
            <DateSelectBox/>
            <ValidSelectBox/>
            <CategorySelectBox categoryList={props.data} />
        </form>
    );
}