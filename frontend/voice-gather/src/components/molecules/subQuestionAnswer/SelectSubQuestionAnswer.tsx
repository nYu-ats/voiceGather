import { VFC } from "react"
import { ListItem } from "../../atoms/listItem/ListItem";

export type SelectSubQuestionAnswerProps = {
    subQuestion: string;
    subSelections: Array<string>;
    subSelectedNumber: Array<number>;
}

export const SelectSubQuestionAnswer: VFC<SelectSubQuestionAnswerProps> = (props) => {
    return (
        <div style={{ padding: '0 1rem' }}>
            <p style={{marginBottom: '0', color:'#666', borderLeft: '.1rem solid #b0c4de', paddingLeft: '1rem'}}>{props.subQuestion}</p>
            <ul style={{ margin: '1rem 0', display: 'flex', justifyContent: 'left' }}>
                {
                    props.subSelections.map((item, index) => {
                        return (
                            <div style={{
                                borderRadius: '1rem',
                                margin: '0 .5rem',
                                backgroundColor: props.subSelectedNumber.includes(index) ? '#ff1493' : 'transparent'
                            }}>
                                <ListItem>
                                    <p style={{
                                        margin: "4px 0",
                                        padding: '0 1rem',
                                        fontWeight: "normal",
                                        color: props.subSelectedNumber.includes(index) ? 'white' : '#666'
                                    }}>{item}</p>
                                </ListItem>
                            </div>
                        );
                    })}
            </ul>
        </div>
    );
}