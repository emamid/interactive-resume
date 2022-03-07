import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunkMiddleware from 'redux-thunk';
import reducers from './Reducers';

const initialState = {
	errors: {},
	loading: {},
	myself: {
		homeHTML: 'homeHTML goes here',
		Projects: []
	},
	project: {
		Employer: {},
		Tags: [],
		Images: []
	},
	projects: [],
	employer: {
		Projects: [],
		References: []
	},
	employers: [],
	projectTags: [],
	tag: {
		Projects: []
	},
	tags: []
};

const client = axios.create({
	baseURL: '/api/rest',
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

function loadObjectFactory(actionName, servicePath) {
	return function (id) {
		return {
			type: `LOAD_${actionName}`,
			payload: {
				request: {
					url: `/${servicePath}/${id}`
				}
			}
		}
	}
}

function loadListFactory(actionName, servicePath) {
	return function () {
		return {
			type: `LOAD_${actionName}`,
			payload: {
				request: {
					url: `/${servicePath}`
				}
			}
		}
	}
}

export const loadEmployer = loadObjectFactory('EMPLOYER', 'employers');
export const loadEmployers = loadListFactory('EMPLOYERS', 'employers');

export const loadProject = loadObjectFactory('PROJECT', 'projects');
export const loadProjects = loadListFactory('PROJECTS', 'projects');

export const loadProjectTags = loadListFactory('PROJECTTAGS', 'project-tags');

export const loadTag = loadObjectFactory('TAG', 'tags');
export const loadTags = loadListFactory('TAGS', 'tags');
