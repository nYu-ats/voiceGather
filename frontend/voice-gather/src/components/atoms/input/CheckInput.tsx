import { VFC } from "react";
import { Label } from "../label/Label";

export type CheckInputProps = {
    value: string;
    checked?: boolean;
    label?:string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const CheckInputBox: VFC<CheckInputProps> = (props) => {
    return (
        <div>
            <input style={{margin:"auto .25em auto 0"}} type="checkbox" onChange={props.onChange} value={props.value} checked={props.checked}/>
            {props.label ? <Label label={props.label} style={{fontSize:".75em", fontWeight:"lighter"}}/>: null}
        </div>
);
}