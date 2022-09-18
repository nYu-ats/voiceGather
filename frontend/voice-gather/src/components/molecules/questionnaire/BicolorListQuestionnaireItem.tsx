import { VFC } from "react";
import styled from "styled-components";
import { Link } from "../../atoms/link/Link";
import { ListItem } from "../../atoms/listItem/ListItem";
import { QuestionnaireItemProps } from "./BicolorListQuestionnaireItem.type";

const StyledDiv = styled.div`
padding: .5em;
transition: all .3s;
&:hover {
    box-shadow: 0px 1px 6px rgba(0,0,0,0.3);
    position:relative;
`

export const BicolorListQuestionnaireItem: VFC<QuestionnaireItemProps> = (props) => {
    const categories = props.category.map((item) => {
        return (
            <ListItem>
                <div style={{
                    marginRight: "4px",
                    fontSize: ".75em",
                    borderRadius: ".75em",
                    backgroundColor: "#d9aacd",
                    padding: ".25em .5em",
                    lineHeight: ".75em",
                    color: "white"
                }}>
                    {item}
                </div>
            </ListItem>
        );
    })
    return (
        <Link linkStyle={{ width: "100%", height: "auto" }} anchor={props.questionnairePageUrl}>
            <StyledDiv style={props.heighLight ? { backgroundColor: "white" } : { backgroundColor: "#e8ecef" }}>
                <div style={{ fontSize: ".75em", fontWeight: "normal", margin: "4px 0" }}>
                    <span style={{ fontWeight: "bold" }}>募集期間: </span>{props.startAt} - {props.endAt}
                </div>
                <div>
                    <h3 style={{ margin: "4px 0", fontSize: "1em", lineHeight: "1em" }}>{props.title}</h3>
                    <p style={{ margin: "4px 0", fontWeight: "normal", fontSize: ".75em" }}>{props.overview}</p>
                </div>
                <div style={{ margin: "4px 0" }}>
                    <ul style={{ display: "flex", justifyContent: "left", margin: "0", padding: "0" }}>
                        {categories}
                    </ul>
                </div>
            </StyledDiv>
        </Link>
    );
}