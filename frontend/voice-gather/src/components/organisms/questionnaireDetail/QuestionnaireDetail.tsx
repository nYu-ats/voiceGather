import { ReactNode, VFC } from 'react';
import { SimpleNavigator } from '../../molecules/navigator/SimpleNavigator';

type QuestionnaireDetailProps = {
    title: string;
    period: {from:string, to:string};
    data: Array<ReactNode>;
    displayIndex: number;
    forwardDisplay: () => void;
    backDisplay: () => void;
}

export const QuestionnaireDetail: VFC<QuestionnaireDetailProps> = (props) => {
    return (
        <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
            <div>
                <p style={{fontWeight:'lighter'}}>募集期間：{props.period.from} ~ {props.period.to}</p>
            </div>
            <div style={{ margin: "1rem", borderBottom: "1px solid #eaedf7" }}>
                <h2>{props.title}</h2>
            </div>
            <div>
                <SimpleNavigator 
                length={props.data.length} 
                index={props.displayIndex}
                forward={props.forwardDisplay}
                back={props.backDisplay}/>
            </div>
            <div style={{}}>
                {props.data[props.displayIndex]}
            </div>
        </div>
    );
}