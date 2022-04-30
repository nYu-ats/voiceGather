import { VFC, ReactNode } from "react";
import { Label } from '../../elements/label/Label';

export type RadioInputProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioInputBox: VFC<RadioInputProps> = (props) => {
    return (
        <div>
            <input type="radio" onChange={props.onChange} value={props.value} checked={props.checked}/>
            <Label label={props.label} style={{fontWeight:"normal", fontSize:".9em"}}/>
        </div>
        );
}