import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
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

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://localhost:3000/api/rest',
    responseType: 'json'
});

export const store = createStore(
    combineReducers(reducers),
	initialState,
    applyMiddleware(
		thunkMiddleware,
		axiosMiddleware(client)
	)
);

export function loadMyself() {
	return {
        type: 'LOAD_MYSELF',
        payload: {
            request: {
                url: '/myself'
            }
        }	
	}
}

export function loadEmployers() {
	return {
        type: 'LOAD_EMPLOYERS',
        payload: {
            request: {
                url: '/employers'
            }
        }	
	}
}