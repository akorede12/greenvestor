import React from "react";
import * as layouts from '../layouts';

// pages
const pages = ({
    index: React.lazy(() => import('../pages')),
    404: React.lazy(() => import('../pages/404')),
    about: React.lazy(() => import('../pages/about')),
    project: React.lazy(() => import('../pages/project')),
    contact: React.lazy(() => import('../pages/contact')),
    signin: React.lazy(() => import('../pages/auth/signin')),
    signup: React.lazy(() => import('../pages/auth/signup')),
    projectDetail: React.lazy(() => import('../pages/project/detail')),
});

export default [
    { path: '*', name: '404', element: pages[404] },
    { path: '/', name: 'index', element: pages.index },
    { path: '/about', name: 'about', element: layouts.main(pages.about) },
    { path: '/signin', name: 'signin', element: layouts.auth(pages.signin) },
    { path: '/signup', name: 'signup', element: layouts.auth(pages.signup) },
    { path: '/contact', name: 'contact', element: layouts.main(pages.contact) },
    { path: '/projects', name: 'projects', element: layouts.main(pages.project) },
    { path: '/projects/:id', name: 'project-detail', element: layouts.main(pages.projectDetail) },
];
