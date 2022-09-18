import { useState, useEffect, useReducer, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DetailTemplate } from '../../template/Detail.template';
import { QuestionnaireDetail } from '../../components/organisms/questionnaireDetail/QuestionnaireDetail';
import { QuestionAggregate } from '../../components/molecules/aggregate/QuestionAggregate';
import {
    QuestionnaireState,
    Question,
    AnswerState,
} from './Detail.type';
import QuestionnaireService from '../../services/questionnaire/QuestionnaireService';
import AnswerService from '../../services/answer/AnswerService';

const initialQuestionnaireState: QuestionnaireState = {
    id: 0,
    title: '',
    period: { from: '', to: '' },
    question: []
}

const initialAnswerState: Array<AnswerState> = []

export const Detail = () => {
    const { id } = useParams();
    const [displayNumberState, changeDisplayNumber] = useState(0);
    const [questionnaireState, setQuestionnaire] = useState<QuestionnaireState>(initialQuestionnaireState);
    const [answerDetailState, setAnsewer] = useState<Array<AnswerState>>(initialAnswerState)

    const forwardDisplayNumber = () => {
        const nextIndex = displayNumberState + 1;
        if (questionnaireState.question.length > nextIndex) {
            const nextAnswer = answerDetailState.find(item => item.index === nextIndex + 1)
            if (!nextAnswer) {
                loadAnswers(questionnaireState.question[nextIndex + 1])
            }
            changeDisplayNumber(nextIndex);
        }
    }
    const backDisplayNumber = () => {
        const nextIndex = displayNumberState - 1;
        const nextAnswer = answerDetailState.find(item => item.index === nextIndex + 1)
        if (!nextAnswer) {
            loadAnswers(questionnaireState.question[nextIndex + 1])
        }
        if (nextIndex >= 0) {
            changeDisplayNumber(nextIndex);
        }
    }

    const initContent = async () => {
        if (!id) { }
        else {
            const questionnaireDetail = await QuestionnaireService.getDetail(parseInt(id));
            setQuestionnaire(questionnaireDetail);
            loadAnswers(questionnaireDetail.question[0]);
        }
    }

    const loadAnswers = async (question: Question) => {
        const answers = await AnswerService.getList(
            {
                questionType: question.questionType,
                questionId: question.id,
                subQuestionType: question.subQuestionType
            }
        )
        setAnsewer([...answerDetailState, {
            index: question.index,
            answer: answers
        }])
    }

    useEffect(() => {
        initContent();
    }, [])

    const questionAggregates = questionnaireState.question.map((question) => {
        const answer = answerDetailState.find(item => question.index === item.index)
        return (
            <QuestionAggregate
                {...question}
                answer={answer ? answer.answer : null}
                answerCount={0}
            />
        )
    })

    const questionnaireDetail = (
        <QuestionnaireDetail
            title={questionnaireState.title}
            period={questionnaireState.period}
            data={questionAggregates}
            displayIndex={displayNumberState}
            forwardDisplay={forwardDisplayNumber}
            backDisplay={backDisplayNumber}
        />)

    return (
        <DetailTemplate
            useFooter={false}
            questionnaireDetail={questionnaireDetail} />
    );
}