import {VFC, ReactNode, useContext} from "react";
import { FormItem } from '../../items/formItem/FormItem';
import { SimpleButton } from "../../elements/button/SimpleButton";
import { DateInputBox } from "../../elements/input/DateInputBox";
import { CheckInputBox } from "../../elements/input/CheckInput";
import { ListItem } from "../../elements/listItem/ListItem";
import { FilterContext } from "../../../template/SimpleTemplate";
import { RefreshIcon } from "../../icons/RefreshIcon";

export type SearchFilterFormProps = {
    data: Array<Category>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type Category = {
    name: string;
    url: string;
}

export const SearchFilterForm:VFC<SearchFilterFormProps> = (props) => {
    const context = useContext(FilterContext);

    return (
        <form style={{width: "20vw", height:"100vh", backgroundColor:"white", borderRadius:"4px", position:"sticky", top:"100px", overflowY:"auto"}}>
            <div style={{width:"100%", textAlign:"right", padding:".1em .5em", boxSizing:"border-box"}} onClick={context.resetFilter}>
                <a style={{width:"24px"}} onClick={context.resetFilter}>
                    <RefreshIcon onClick={context.resetFilter}/>
                </a>
            </div>
            <FormItem
            title='募集開始日'
            nodes={[
            <DateInputBox label="from" onChange={context.selectStartDate} value={context.searchFilterState.startDate}/>, 
            <DateInputBox label="to" onChange={context.selectEndDate}  value={context.searchFilterState.endDate}/>]}
            />
            <FormItem
            title='カテゴリ'
            nodes={
                props.data.map((category)=>{
                    return (
                        <ListItem>
                            <div style={{display:"flex"}}>
                                <CheckInputBox onChange={context.toggleCategory} value={category.name} checked={context.searchFilterState.category.indexOf(category.name) >= 0}/>
                                <p style={{margin:"0", lineHeight:"1.2em", color:"#666"}}>{category.name}</p>
                            </div>
                        </ListItem>
                    );
                })
            }
            />
            <div style={{width:"100%", padding:".5em", marginTop:"1em"}}>
                <SimpleButton label="検索" onClick={props.onClick}/>
            </div>
        </form>
    );
}