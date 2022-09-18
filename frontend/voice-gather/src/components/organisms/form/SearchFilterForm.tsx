import { VFC, useEffect } from "react";
import { FormItem } from '../../molecules/formItem/FormItem';
import { SimpleButton } from "../../atoms/button/SimpleButton";
import { DateInputBox } from "../../atoms/input/DateInputBox";
import { CheckInputBox } from "../../atoms/input/CheckInput";
import { ListItem } from "../../atoms/listItem/ListItem";
import { RefreshIcon } from "../../icons/RefreshIcon";
import { useDispatch, useSelector } from "react-redux";
import { Category as CategoryIF } from "../../../store/index"
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/category/CategoryService";
import queryString from 'query-string';
import { Path } from "../../../resource/Path";

export type SearchFilterFormProps = {
}

export const SearchFilterForm: VFC<SearchFilterFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const category: Array<CategoryIF> = useSelector((state: any) => state.categoryReducer);
    const loadCategory = async () => {
        const response = await CategoryService.getList({ orderBy: 'name' })
        return { type: 'SET', data: response };
    }
    const setCategory = async () => dispatch(await loadCategory());

    const searchFilterState = useSelector((state: any) => state.searchFilterReducer);
    const selectStartDate = (
        e: React.ChangeEvent<HTMLInputElement>) => dispatch(
            { type: 'STARTAT', value: e.target.value })
    const selectEndDate = (
        e: React.ChangeEvent<HTMLInputElement>) => dispatch(
            { type: 'ENDAT', value: e.target.value })
    const toggleCategory = (
        e: React.ChangeEvent<HTMLInputElement>) => dispatch(
            { type: 'CATEGORY', value: e.target.value })
    const resetFilter = () => dispatch(
        { type: 'RESET', value: null })

    const submit: React.MouseEventHandler<HTMLButtonElement> = async (e: React.MouseEvent) => {
        e.preventDefault();

        navigate(Path.page + '?' + queryString.stringify({ ...searchFilterState }))
    };

    useEffect(() => {
        setCategory();
    }, []);

    return (
        <form style={{
            width: "20vw", height: "100vh", backgroundColor: "white",
            borderRadius: "4px", position: "sticky", top: "100px", overflowY: "auto"
        }}>
            <div style={{
                width: "100%", textAlign: "right", padding: ".1em .5em",
                boxSizing: "border-box"
            }} onClick={resetFilter}>
                <a style={{ width: "24px" }} onClick={resetFilter}>
                    <RefreshIcon onClick={resetFilter} />
                </a>
            </div>
            <FormItem
                title='募集開始日'
                nodes={[
                    <DateInputBox
                        label="from"
                        onChange={selectStartDate}
                        value={searchFilterState.startDate} />,
                    <DateInputBox
                        label="to"
                        onChange={selectEndDate}
                        value={searchFilterState.endDate} />]}
            />
            <FormItem
                title='カテゴリ'
                nodes={
                    category.map((category) => {
                        return (
                            <ListItem>
                                <div style={{ display: "flex" }}>
                                    <CheckInputBox
                                        onChange={toggleCategory}
                                        value={category.name}
                                        checked={
                                            searchFilterState.category.indexOf(category.name) >= 0
                                        } />
                                    <p style={{
                                        margin: "0", lineHeight: "1.2em", color: "#666"
                                    }}>{category.name}</p>
                                </div>
                            </ListItem>
                        );
                    })
                }
            />
            <div style={{ width: "100%", padding: ".5em", marginTop: "1em", boxSizing: 'border-box' }}>
                <SimpleButton label="検索" onClick={submit} />
            </div>
        </form>
    );
}