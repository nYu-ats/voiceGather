import { VFC } from "react"
import { SelectQuestionAnswer } from "../../organisms/answer/SelectQuestionAnswer";

export type SelectQuestionAggregateProps = {
    question: string;
    answer: Array<AnswerData>;
}

type AnswerData = {
    content: string;
    count: number;
}

export const SelectQuestionAggregate: VFC<SelectQuestionAggregateProps> = (props) => {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <p style={{ lineHeight: '1.5rem', marginRight: '1rem' }}>Q. </p>
                <h3 style={{ fontWeight: 'normal' }}>{props.question}</h3>
            </div>
            <div>
                <p>回答数：<span>{props.answer.length}</span></p>
            </div>
            <div>
                <SelectQuestionAnswer
                    data={props.answer} />
            </div>
        </div>
    );
}