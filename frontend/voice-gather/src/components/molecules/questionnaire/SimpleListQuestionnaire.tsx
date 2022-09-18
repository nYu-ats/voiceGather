import { VFC } from "react";
import styled from "styled-components";
import { Link } from "../../atoms/link/Link";
import { QuestionnaireItemProps } from "./SimpleListQuestionnaire.type";

const StyledDiv = styled.div`
padding: .5em;
transition: all .3s;
&:hover {
    box-shadow: 0px 1px 6px rgba(0,0,0,0.3);
    position:relative;
`

export const SimpleListQuestionnaireItem: VFC<QuestionnaireItemProps> = (props) => {
    return (
        <Link linkStyle={{ width: "100%", height: "auto" }} anchor={props.questionnairePageUrl}>
            <StyledDiv>
                <div style={{ fontSize: ".75em", fontWeight: "normal", margin: "4px 0" }}>
                    <span style={{ fontWeight: "bold" }}>募集期間: </span>{props.startAt} - {props.endAt}
                </div>
                <div>
                    <h3 style={{ margin: "4px 0", fontSize: "1em", lineHeight: "1em" }}>{props.title}</h3>
                    <p style={{ margin: "4px 0", fontWeight: "normal", fontSize: ".75em" }}>{props.overview}</p>
                </div>
            </StyledDiv>
        </Link>
    );
}