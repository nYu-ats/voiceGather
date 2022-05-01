import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Top } from '../pages/Top'
import { SearchPage } from '../pages/SearchPage';

export const AppRoute = () => {
    let element = useRoutes([
        {
            path: '/',
            element: <Top />,
        },
        {
            path: '/search',
            element: <SearchPage />,
        },
    ]);
    return element;
}