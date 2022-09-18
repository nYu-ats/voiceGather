import { VFC } from "react";
import { Link } from "../../atoms/link/Link";
import { TrendKeywordProps } from "./TrendContainer.type";

export const TrendKeywordContainer: VFC<TrendKeywordProps> = (props) => {
    const trendKeywords = props.trend.map((item) => {
        return (
            <div style={{ margin: "0 1rem", padding: ".5em", width: "25%", backgroundColor: "white", borderRadius: "4px" }}>
                <h3 style={{ color: "#666", margin: "0", borderBottom: "1px solid #eaedf7" }}>{item.title}</h3>
                <div style={{ padding: "0", marginTop: ".5em", display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
                    {item.data.map((data, index) => {
                        return (
                            <div style={{ paddingRight: ".1em" }}>
                                <Link
                                    linkStyle={{
                                        width: "100%",
                                        fontSize: ".8em",
                                        hoverColor: "#6699ff"
                                    }}
                                    key={index}
                                    anchor={data.keywordPageUrl}>
                                    {data.keyword}
                                </Link>
                                /
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    })

    return (
        <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
            <div style={{ margin: "1rem" }}>
                <h2 style={{ marginBottom: "0", color: "#666" }}>トレンドキーワード</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
                {trendKeywords}
            </div>
        </div>
    );
}