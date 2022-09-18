import { VFC, useContext } from "react";
import { RadioInputBox } from "../../atoms/input/RadioInput";
import { SearchPageContext } from "../../../pages/filtered/Filtered.page";
import { SelectInput } from "../../atoms/input/SelectInput";

export type DisplayFilterFormProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DisplayFilterForm:VFC<DisplayFilterFormProps> = (props) => {
    const context = useContext(SearchPageContext);

    return (
        <form style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{display:"flex"}}>
                <RadioInputBox 
                label="全て" 
                value="ALL" 
                onChange={context.changeDisplay} 
                checked={context.displayFilterState.display === 'ALL' ? true : false}/>
                <RadioInputBox 
                label="有効なアンケート" 
                value="VALID" 
                onChange={context.changeDisplay}
                checked={context.displayFilterState.display === 'VALID' ? true : false}/>
            </div>
            <SelectInput 
            options={[
                {name: "作成日順", value: "CREATEDAT"},
                {name: "回答数順", value: "ANSWER"}
            ]} onChange={context.changeSort}/>
        </form>
    );
}