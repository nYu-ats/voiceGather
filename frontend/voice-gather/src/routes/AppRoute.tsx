import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Top } from '../pages/Top'

export const AppRoute = () => {
    let element = useRoutes([
        {
        path: '/',
        element: <Top />,
        }
    ]);
    
    return element;
}