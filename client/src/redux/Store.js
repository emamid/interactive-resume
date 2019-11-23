import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './Reducers';

const initialState = {
    errors: {},
    loading: {},
    myself: {
        homeHTML: 'homeHTML goes here'
    },
    project: {},
    projects: [],
    employer: {},
    employers: [],
    tag: {},
    tags: []
};

export const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunkMiddleware)
);
