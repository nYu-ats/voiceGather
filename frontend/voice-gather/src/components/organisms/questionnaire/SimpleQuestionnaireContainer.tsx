import { VFC } from "react";
import { BicolorListQuestionnaireItem } from "../../molecules/questionnaire/BicolorListQuestionnaireItem";
import { LinkQuestionnaireContainerProps } from "./SimpleQuestionnaireContainer.type";

export const SimpleQuestionnaireContainer: VFC<LinkQuestionnaireContainerProps> = (props) => {
    let counter = 0;
    const item = props.data?.map((item) => {
        if (item.isDisplay) {
            counter += 1;
            return (
                <BicolorListQuestionnaireItem
                    heighLight={counter % 2 === 0 ? true : false}
                    {...item} />
            )
        }
    })

    return (
        <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
            <div style={{ margin: "1rem", borderBottom: "1px solid #eaedf7" }}>
                <h2>{props.head}</h2>
            </div>
            <div style={{ margin: "1rem" }}>
                {item}
            </div>
        </div>
    );
}