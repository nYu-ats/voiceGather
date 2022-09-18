import { VFC } from "react";
import { Label } from "../label/Label";

export type DateInputProps = {
    label?:string;
    value?:string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const DateInputBox: VFC<DateInputProps> = (props) => {
    return (
        <div style={{width:"100%", boxSizing:"border-box"}}>
            {
            props.label ? <div style={{paddingRight:"1em"}}><Label label={props.label} style={{fontSize:".75em", fontWeight:"normal"}}/></div>: null
            }
            <input type="date" onChange={props.onChange} style={{color:"#666"}} value={props.value}/>
        </div>
);
}