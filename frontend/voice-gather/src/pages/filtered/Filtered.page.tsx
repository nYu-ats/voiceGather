import React, { useState, useEffect, useReducer, useMemo, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SimpleQuestionnaireContainer } from '../../components/organisms/questionnaire/SimpleQuestionnaireContainer';
import { DisplayFilterForm } from '../../components/organisms/form/DisplayFilterForm';
import { QuestionnaireDateComparator, QuestionnaireAnswerCountComparator } from '../../features/utility/Comparator';
import { FilteredTemplate } from '../../template/Filtered.template';
import QuestionnaireService from '../../services/questionnaire/QuestionnaireService';
import queryString from 'query-string';
import { Path } from '../../resource/Path';
import { QuestionnaireOverview } from './Filtere.type';

type DisplayFilterState = {
    display: string;
    sort: string;
}

type DisplayFilterAction = { type: 'DISPLAY', value: string } | { type: 'SORT', value: string }

const initialDisplayFilterState = {
    display: 'ALL',
    sort: 'CREATEDAT'
}

const displayFilterReducer = (state: DisplayFilterState, action: DisplayFilterAction) => {
    switch (action.type) {
        case 'DISPLAY':
            return { ...state, display: action.value }
        case 'SORT':
            return { ...state, sort: action.value }
        default:
            return state;
    }
}

export const SearchPageContext = createContext<any>(initialDisplayFilterState);

export const Filtered = () => {
    const params = useLocation().search;
    const today = new Date();
    const [content, setContent] = useState<{ data: Array<QuestionnaireOverview>, head: string }>(
        { data: [], head: '' } as { data: Array<QuestionnaireOverview>, head: string });

    const [displayFilterState, displayFilterDispatch] = useReducer(displayFilterReducer, initialDisplayFilterState);
    const changeDisplay = (e: React.ChangeEvent<HTMLInputElement>) => displayFilterDispatch({ type: 'DISPLAY', value: e.target.value })
    const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => displayFilterDispatch({ type: 'SORT', value: e.target.value })

    const sortContent = () => {
        let sortedContent = content;
        if (displayFilterState.sort === 'CREATEDAT') {
            sortedContent.data.sort(QuestionnaireDateComparator);
        } else if (displayFilterState.sort === 'ANSWER') {
            sortedContent.data.sort(QuestionnaireAnswerCountComparator);
        }
        setContent(sortedContent);
    };

    const controllDisplay = () => {
        let displayControlledContent = content;
        if (displayFilterState.display === 'ALL') {
            displayControlledContent.data.forEach((item) => { item.isDisplay = true })
        } else if (displayFilterState.display === 'VALID') {
            displayControlledContent.data.forEach((item) => { item.isDisplay = (new Date(item.endAt) > today) })
        }
        setContent(displayControlledContent);
    };

    const initContent = async () => {
        const query = queryString.parse(params);
        const categoryParam = typeof query.category === 'string' ? [query.category] : query.category;
        const keywordParam = typeof query.keyword === 'string' ? [query.keyword] : query.keyword;
        let head = categoryParam ? categoryParam.join('/') : '';
        head += keywordParam ? keywordParam.join('/') : '';
        head = head ? head : '検索結果';
        const questionnaire = await QuestionnaireService.getList({
            startAt: query.startDate as string | null,
            endAt: query.endDate as string | null,
            category: categoryParam as Array<string> | null,
            keyword: keywordParam as Array<string> | null,
        })

        setContent({
            head: head,
            data: questionnaire.map((item => {
                return {
                    ...item,
                    questionnairePageUrl: Path.questionnaire + '/' + item.id
                }
            }))
        });
    }

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
        initContent();
    }, [params]);

    const displayFilterContent = (
        <SearchPageContext.Provider value={displayFilterValue}>
            <DisplayFilterForm />
        </SearchPageContext.Provider>
    );

    const simpleContent = <SimpleQuestionnaireContainer data={content.data} head={content.head} />;

    return (
        <FilteredTemplate
            useFooter={false}
            displayFilter={displayFilterContent}
            simpleQuestionnaire={simpleContent} />
    );
}