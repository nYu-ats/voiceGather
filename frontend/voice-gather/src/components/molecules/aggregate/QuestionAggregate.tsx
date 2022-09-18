import { ReactNode, VFC } from "react"
import { SelectAnswerSummary } from "../../../pages/detail/Detail.type";
import { SelectQuestionAnswer } from "../../organisms/answer/SelectQuestionAnswer";
import { TextQuestionAnswer } from "../../organisms/answer/TextQuestionAnswer";
import { SelectSubQuestionAnswer } from "../subQuestionAnswer/SelectSubQuestionAnswer";
import { TextSubQuestionAnswer } from "../subQuestionAnswer/TextSubQuestionAnswer";
import { QuestionAggregateProps, SelectAnswer, TextAnswer } from "./QuestionAggregate.type";

export const QuestionAggregate: VFC<QuestionAggregateProps> = (props) => {
    const createAnswerComponent = (props: QuestionAggregateProps) => {
        if (!props.answer) {
            return [] as Array<ReactNode>;
        } else {
            if (props.questionType === 1) {
                const answers = props.answer as Array<TextAnswer>;
                const answerComponents = answers.map((answer, index) => {
                    let subAnswerComponent = null;
                    if (answer.subAnswer && props.subQuestionType === 1) {
                        const subAnswer = answer.subAnswer as Array<string>;
                        subAnswerComponent = <TextSubQuestionAnswer
                            subQuestion={props.subQuestion as string}
                            answer={subAnswer} />
                    } else if (answer.subAnswer && props.subQuestionType === 2) {
                        const subAnswer = answer.subAnswer as Array<number>;
                        subAnswerComponent = <SelectSubQuestionAnswer
                            subQuestion={props.subQuestion as string}
                            subSelections={props.subSelections?.map(item => item.content) as Array<string>}
                            subSelectedNumber={subAnswer} />
                    }
                    return <TextQuestionAnswer
                        heighLight={index % 2 === 0 ? true : false}
                        data={{
                            date: answer.createdAt,
                            answer: answer.answer,
                            subAnswer: subAnswerComponent
                        }} />
                })
                return answerComponents;
            } else if (props.questionType === 2) {
                const answers = props.answer as SelectAnswer;
                let subAnswerComponents = null;
                if (answers.subAnswer && props.subQuestionType === 1) {
                    const subAnswers = answers.subAnswer as Array<TextAnswer>;
                    subAnswerComponents = subAnswers.map((subAnswer, index) => {
                        return (
                            <TextQuestionAnswer
                                heighLight={index % 2 === 0 ? true : false}
                                data={{
                                    date: subAnswer.createdAt,
                                    answer: subAnswer.answer,
                                }} />
                        );
                    })
                } else if (answers.subAnswer && props.subQuestionType === 2) {
                    const subAnswers = answers.subAnswer as Array<SelectAnswerSummary>;
                    subAnswerComponents = <SelectQuestionAnswer data={subAnswers} />
                }
                return [
                    <SelectQuestionAnswer
                        data={answers.answer}
                        subAnswer={subAnswerComponents}
                        subQuestion={props.subQuestion as string | undefined} />
                ]
            }
        }
        return [] as Array<ReactNode>;
    }

    return (
        <div style={{ width: '100%', flexShrink: '0' }}>
            <h3 style={{ fontWeight: 'normal', paddingLeft: '1rem', borderLeft: '.3rem solid #b0c4de' }}>{props.question}</h3>
            <div>
                <p>回答数：<span>{props.answerCount}</span></p>
            </div>
            <div>
                {createAnswerComponent(props)}
            </div>
        </div>
    );
}