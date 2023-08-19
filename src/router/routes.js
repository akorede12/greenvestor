import React from "react";
import * as layouts from '../layouts';

// pages
const pages = ({
    index: React.lazy(() => import('../pages')),
    404: React.lazy(() => import('../pages/404')),
    project: React.lazy(() => import('../pages/project')),
    projectDetail: React.lazy(() => import('../pages/project/detail')),
});

export default [
    { path: '*', name: '404', element: pages[404] },
    { path: '/', name: 'index', element: pages.index },
    { path: '/projects', name: 'project', element: layouts.main(pages.project) },
    { path: '/projects/:id', name: 'project-detail', element: layouts.main(pages.projectDetail) },
];
