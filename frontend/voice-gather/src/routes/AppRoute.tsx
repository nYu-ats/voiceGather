import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Top } from '../pages/top/Top.page'
import { Filtered } from '../pages/filtered/Filtered.page';
import { Detail } from '../pages/detail/Detail.page';

export const AppRoute = () => {
    let element = useRoutes([
        {
            path: '/top',
            element: <Top />,
        },
        {
            path: '/filtered',
            element: <Filtered />,
        },
        {
            path: '/page',
            element: <Filtered />,
        },
        {
            path: '/questionnaire/:id',
            element: <Detail />,
        },
    ]);
    return element;
}