import React, { useState, useEffect, useReducer, useMemo, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SimpleQuestionnaireContainer } from '../components/blocks/questionnaire/SimpleQuestionnaireContainer';
import { SimpleTemplate } from '../template/SimpleTemplate';
import { DisplayFilterForm } from '../components/blocks/filterBox/DisplayFilterForm';
import { QuestionnaireOverview } from "../components/items/questionnaire/BicolorListQuestionnaireItem";
import { dateComparator, answerCountComparator } from '../features/questionnaire/QuestionnaireUtility';

type DisplayFilterState = {
    display: string;
    sort: string;
}

type DisplayFilterAction = {type: 'DISPLAY', value:string} | {type: 'SORT', value:string}

const initialDisplayFilterState = {
    display: 'ALL',
    sort: 'CREATEDAT'
}

const displayFilterReducer = (state: DisplayFilterState, action: DisplayFilterAction) => {
    switch (action.type){
        case 'DISPLAY':
            return {...state, display: action.value}
        case 'SORT':
            return {...state, sort: action.value}
        default:
            return state;
    }
}

export const SearchPageContext = createContext<any>(initialDisplayFilterState);

export const SearchPage = () => {
    const today = new Date();

    const location = useLocation();
    const [content, setContent] = useState<{data: Array<QuestionnaireOverview>, head:string}>(
        location.state as {data: Array<QuestionnaireOverview>, head:string});
    
    const [displayFilterState, displayFilterDispatch] = useReducer(displayFilterReducer, initialDisplayFilterState);
    const changeDisplay = (e:React.ChangeEvent<HTMLInputElement>) => displayFilterDispatch({type: 'DISPLAY', value: e.target.value})
    const changeSort = (e:React.ChangeEvent<HTMLSelectElement>) => displayFilterDispatch({type: 'SORT', value: e.target.value})

    const sortContent = ()=>{
        let sortedContent = content;
        if(displayFilterState.sort === 'CREATEDAT'){
            sortedContent.data.sort(dateComparator);
        }else if(displayFilterState.sort === 'ANSWER'){
            sortedContent.data.sort(answerCountComparator);
        }
        setContent(sortedContent);
    };

    const controllDisplay = ()=>{
        let displayControlledContent = content;
        if(displayFilterState.display === 'ALL'){
            displayControlledContent.data.forEach((item)=> {item.isDisplay = true})
        }else if(displayFilterState.display === 'VALID'){
            displayControlledContent.data.forEach((item)=>{item.isDisplay = (new Date(item.endDate) > today)})
        }
        setContent(displayControlledContent);
    };

    useMemo(() => {
        sortContent();
    }, [displayFilterState.sort]);

    useMemo(() => {
        controllDisplay();
    }, [displayFilterState.display]);

    const displayFilterValue = useMemo(
        () => ({
            displayFilterState,
            changeDisplay,
            changeSort  
        }), [displayFilterState]
    );

    useEffect(() => {
        setContent(location.state as {data: Array<QuestionnaireOverview>, head:string});
    }, [location.state]);

    return (
        <SimpleTemplate useFooter={false}>
            <div style={{width: "75vw",marginRight: ".5em"}}>
                <div style={{width:"100%", backgroundColor:"white", borderRadius: "4px"}}>
                    <div style={{padding:".5em"}}>
                        <SearchPageContext.Provider value={displayFilterValue}>
                            <DisplayFilterForm/>
                        </SearchPageContext.Provider>
                    </div>
                    <SimpleQuestionnaireContainer data={content.data} head={content.head}/>
                </div>
            </div>
        </SimpleTemplate>
    );
}