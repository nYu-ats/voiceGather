import { ReactNode, VFC } from "react"
import { SimpleGraph } from '../../molecules/graph/SimpleGraph';

export type SelectQuestionAnswerProps = {
    data: Array<AnswerData>;
    subQuestion?: string;
    subAnswer?: ReactNode;
}

type AnswerData = {
    content: string;
    count: number;
}

export const SelectQuestionAnswer: VFC<SelectQuestionAnswerProps> = (props) => {
    let max = Math.max(...props.data.map((item) => item.count));

    return (
        <div>
            <SimpleGraph
                data={
                    props.data.map((item) => {
                        return {
                            label: item.content,
                            value: item.count,
                            rate: item.count / max * 100
                        }
                    })
                } />
            {props.subAnswer ?
                <div style={{ margin: '0 1rem', backgroundColor: "#fafafa", padding: '0 1rem' }}>
                    <p style={{ color: '#666' }}>サブ設問</p>
                    <p style={{ color: '#666', lineHeight: '1.5rem', margin: '0', paddingLeft: '1rem', borderLeft: '.1rem solid #b0c4de' }}>{props.subQuestion}</p>
                    {props.subAnswer}
                </div> : null}
        </div>
    );
}