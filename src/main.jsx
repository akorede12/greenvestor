import './style.sass';
import React from 'react';
import store from './store';
import $router from './router';
import * as Redux from 'react-redux';
import $wallet from './router/wallet';
import reactDom from 'react-dom/client';

reactDom.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <$wallet>
            <Redux.Provider store={store} children={<$router />} />
        </$wallet>
    </React.StrictMode>
);
