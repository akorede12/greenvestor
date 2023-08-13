import React from "react";
import * as layouts from '../layouts';

// pages
const pages = ({
    index: React.lazy(() => import('../pages')),
    404: React.lazy(() => import('../pages/404')),
});

export default [
    { path: '*', name: '404', element: pages[404] },
    { path: '/', name: 'index', element: pages.index },
];
