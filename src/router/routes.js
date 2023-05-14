import React from "react";
import * as layouts from '../layouts';

// pages
const pages = ({
    404: React.lazy(() => import('../pages/404')),
    home: React.lazy(() => import('../pages/home')),
});

export default [
    { path: '*', name: '404', element: pages[404] },
    { path: '/', name: 'home', element: pages.home },
];
