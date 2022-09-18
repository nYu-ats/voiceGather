import { VFC } from "react"
import { MenuRightIcon } from "../../icons/MenuRightIcon";
import { MenuLeftIcon } from "../../icons/MenuLeftIcon";

export type SimpleNavigatorProps = {
    length: number;
    index: number;
    forward: () => void;
    back: () => void;
}

export const SimpleNavigator: VFC<SimpleNavigatorProps> = (props) => {
    const leftPos = 104  - 48 * props.index;
    const indexList = (
        <div style={{
            display:'flex', 
            justifyContent:'center', 
            transition:'.3s',
            position:'absolute',
            top:'0',
            bottom:'0',
            left:String(leftPos)+'px'}}>
            {Array.from(Array(props.length).keys()).map((item) => {
                if(item !== props.index){
                    return <div style={{margin: '0 1em', lineHeight:'1.5em', width:'1em', textAlign:'center', fontWeight:'lighter'}}>{item+1}</div>;
                }else{
                    return <div style={{margin: '0 1em', lineHeight:'1.5em', width:'1em', textAlign:'center', fontWeight:'bold'}}>{item+1}</div>;
                }
            })}
        </div>
    );

    return (
        <div style={{display:'flex', justifyContent:'center', height:'24px'}}>
            <div style={{margin: '0 1em'}}  onClick={props.back}>
                <div style={{width:"24px"}}>
                    <MenuLeftIcon/>
                </div>
            </div>
            <div style={{width:'15em', overflow:'hidden', position:'relative'}}>
                {indexList}
            </div>
            <div style={{margin: '0 1em'}} onClick={props.forward}>
                <div style={{width:"24px"}}>
                    <MenuRightIcon/>
                </div>
            </div>
        </div>
    );
}