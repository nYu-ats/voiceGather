import { VFC } from 'react';
import { Link } from "../../atoms/link/Link";
import { SimpleListQuestionnaireItem } from '../../molecules/questionnaire/SimpleListQuestionnaire';
import { CategorizedQuestionnaireContainerProps } from './CategorizedQuestionnaireContainer.type'

export const CategorizedQuestionnaireContainer: VFC<CategorizedQuestionnaireContainerProps> = (props) => {
    const questionnaireComponents = props.data.map((categorized) => {
        return (
            <div style={{ margin: "1rem", width: "45%" }}>
                <h3 style={{ borderBottom: "2px solid #d9aacd" }}>{categorized.category}</h3>
                {categorized.data?.map((item) => {
                    return (
                        <SimpleListQuestionnaireItem {...item} />
                    );
                })}
                <div style={{ textAlign: "right" }}>
                    <Link
                        linkStyle={{
                            width: "100%",
                            color: "#6699ff",
                            hoverColor: "#6666ff",
                        }}
                        anchor={categorized.cateogryPageUrl}>もっとみる ＞＞
                    </Link>
                </div>
            </div>
        )
    });

    return (
        <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
            <div style={{ margin: "1rem", borderBottom: "1px solid #eaedf7" }}>
                <h2>ピックアップ</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
                {questionnaireComponents}
            </div>
        </div>
    );
}