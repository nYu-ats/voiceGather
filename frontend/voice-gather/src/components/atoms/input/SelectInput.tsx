import {VFC } from "react";

export type SelectInputProps = {
    options: Array<Options>;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

type Options = {
    value: string;
    name: string;
}

export const SelectInput: VFC<SelectInputProps> = (props) => {
    return (
        <select style={{color:"#666", width:"10em", border:"none", outline:"none"}} onChange={props.onChange}>
            {
                props.options.map((option) => {
                    return <option value={option.value}>{option.name}</option>
                })
            }
        </select>
    );
}