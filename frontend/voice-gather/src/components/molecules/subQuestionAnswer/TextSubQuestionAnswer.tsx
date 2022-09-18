import { VFC } from "react"
import { ListItem } from "../../atoms/listItem/ListItem";

export type TextSubQuestionAnswerProps = {
    subQuestion:string;
    answer:Array<string>;
}

export const TextSubQuestionAnswer: VFC<TextSubQuestionAnswerProps> = (props) => {
    return (
        <div style={{ padding: '0 1rem' }}>
            <p style={{marginBottom: '0', color:'#666', borderLeft: '.1rem solid #b0c4de', paddingLeft: '1rem'}}>{props.subQuestion}</p>
            <ul style={{ margin: '1rem 0' }}>
                {
                    props.answer.map((item) => {
                        return (
                            <ListItem listStyle="outside" listType="decimal">
                                <p style={{
                                    margin: "4px 0",
                                    fontWeight: "normal",
                                    color: '#666'
                                }}>{item}</p>
                            </ListItem>
                        );
                    })}
            </ul>
        </div>
    );
}