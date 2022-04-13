import {VFC} from "react";
import { Link } from "../../elements/link/Link";
import { ListItem } from "../../elements/listItem/ListItem";

export type TrendKeywordProps = {
    data: Array<TrendKeyword>;
}

export type TrendKeyword = {
    week: string;
    data: Array<string>;
}

export const TrendKeywordContainer : VFC<TrendKeywordProps> = (props) => {
    return (
        <div style={{width:"100%", padding:"1rem", boxSizing:"border-box"}}>
            <div style={{margin:"1rem", borderBottom:"1px solid #eaedf7"}}>
                <h2 style={{marginBottom:"0"}}>トレンドキーワード</h2>
            </div>
            <div style={{display:"flex", justifyContent:"left", flexWrap:"wrap"}}>
            {props.data.map((trend)=>{
                return (
                    <div style={{margin:"0 1rem", width:"30%"}}>
                        <h3 style={{color:"#666", margin:"0", borderBottom:"1px solid #666"}}>{trend.week}</h3>
                        <ul style={{padding:"0", marginTop:".5em"}}>
                        {trend.data?.map((item, index)=>{
                            return(
                            <ListItem key={index}>
                                <Link linkStyle={{width:"100%"}}>
                                    {item}
                                </Link>
                            </ListItem>
                            );
                        })}
                        </ul>
                    </div>    
                )
            })}
            </div>
        </div>
    );
}