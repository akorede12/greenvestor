import * as auth from './slice/auth.slice';
import * as invest from './slice/invest.slice';
import * as projects from './slice/project.slice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';


const store = configureStore({ reducer: { auth: auth.default, projects: projects.default, invest: invest.default } });

export default store;

/**
 * It returns an object with a login property that is a function that takes in data and dispatches the
 * login action creator with that data
 * @returns An object with a login property that takes in data and dispatches the auth.login action
 * with the data.
 */
export const useMyDispatch = () => {
    const dispatch = useDispatch();

    return ({
        login: data => dispatch(auth.login(data)),
        allProjects: () => dispatch(projects.all()),
        allInvestments: () => dispatch(invest.all()),

    })
}


/**
 * It returns an object with the auth state from the redux store
 * @returns An object with the auth property.
 */
export const useMyStore = () => {
    return ({
        auth: useSelector(state => state.auth),
        invest: useSelector(state => state.invest),
        projects: useSelector(state => state.projects),
    })
};
