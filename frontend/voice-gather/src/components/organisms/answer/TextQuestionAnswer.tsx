import { ReactNode, VFC, useState } from "react"
import { ListItem } from "../../atoms/listItem/ListItem";
import { OpenCloseContent } from "../../molecules/content/OpenCloseContent";

export type TextQuestionAnswerProps = {
    heighLight: boolean;
    data: AnswerData;
}

type AnswerData = {
    date: string;
    answer: Array<string>;
    subAnswer?: ReactNode;
}

export const TextQuestionAnswer: VFC<TextQuestionAnswerProps> = (props) => {
    const [subQuestionOpen, setSubQuestionOpen] = useState(false);
    const subQuestionToggle = () => {
        const next = !subQuestionOpen;
        setSubQuestionOpen(next);
    }

    return (
        <div style={props.heighLight ? { backgroundColor: "white", padding: '.5em' } : { backgroundColor: "#e8ecef", padding: '.5em' }}>
            <div>
                <p style={{ fontWeight: "lighter", fontSize: '.8rem'}}>{props.data.date}</p>
            </div>
            <ul>
                {props.data.answer.map((item) => {
                    return (
                        <ListItem listStyle="outside" listType="decimal">
                            <p style={{
                                margin: "4px 0",
                                fontWeight: "normal",
                                fontSize: "1rem"
                            }}>{item}</p>
                        </ListItem>)
                })}
            </ul>
            {props.data.subAnswer ?
                <OpenCloseContent
                    contentName="サブ設問"
                    height="0"
                    isOpen={subQuestionOpen}
                    onClick={subQuestionToggle}>
                        {props.data.subAnswer}
                </OpenCloseContent> : null
            }
        </div>
    );
}