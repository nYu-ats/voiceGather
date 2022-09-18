import { VFC } from "react"
import { Spring, animated } from 'react-spring';
import { ListItem } from "../../atoms/listItem/ListItem";

export type SimpleGraphProps = {
    data: Array<Graph>;
}

type Graph = {
    label: string;
    value: number;
    rate: number;
}

const initialGraphStyle = {
    width: '0%',
    opacity: '0'
}

export const SimpleGraph: VFC<SimpleGraphProps> = (props) => {
    return (
        <ul>
            {props.data.map((item)=>{
                return (
                    <ListItem>
                        <div style={{display:'flex', justifyContent:'left'}}>
                            <p style={{color:'#666', width:'20%', paddingRight:'1rem'}}>{item.label}</p>
                            <Spring from={initialGraphStyle} to={{
                                width: String(item.rate*0.8)+'%', 
                                opacity: '1',
                                height:'1.5rem', 
                                margin: 'auto 0',
                                backgroundColor:'#ff1493'}}>
                                {styles =>
                                    <animated.div style={styles}>
                                        <p style={{lineHeight:'1.5rem', color:'white', paddingLeft:'.5rem', margin:'0'}}>{item.value}</p>
                                    </animated.div>
                                }
                            </Spring>
                        </div>
                </ListItem>
                );
            })}
        </ul>
    );
}