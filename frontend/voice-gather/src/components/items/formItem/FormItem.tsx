import {VFC, ReactNode} from "react";
import { Label } from "../../elements/label/Label";

type FormItemProps = {
    title: string;
    nodes: Array<ReactNode>;
}

export const FormItem :VFC<FormItemProps> = (props) =>{
    return(
        <div style={{width:"100%", padding:".5em 0 0 .5em", boxSizing:"border-box"}}>
            <Label label={props.title}></Label>
            <div style={{width:"100%", padding:".5em"}}>
                {props.nodes.map((node)=>{
                    return node;
                })}
            </div>
        </div>
    )
}