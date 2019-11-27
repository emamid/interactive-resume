import actionConstants from './ActionConstants';

const errors = (state = {}, action) => {
    switch (action.type) {
        case actionConstants.LOAD_MYSELF_REQUEST:
            return {
                ...state,
                myself: false
            }
        case actionConstants.LOAD_MYSELF_SUCCESS:
            return {
                ...state,
                myself: false
            }
        // Also handle employer, employers, project, projects, tag, tags
        default:
            return state;
    }
};

const loading = (state = {}, action) => {
    switch (action.type) {
        case actionConstants.LOAD_MYSELF_FAILURE:
            return {
                ...state,
                myself: false
            }
        case actionConstants.LOAD_MYSELF_REQUEST:
            return {
                ...state,
                myself: true
            }
        case actionConstants.LOAD_MYSELF_SUCCESS:
            return {
                ...state,
                myself: false
            }
        // Also handle employer, employers, project, projects, tag, tags
        default:
            return state;
    }
};

const objectReducerFactory = (name, defaultValue = {}) => {
    return (state = {}, action) => {
        switch (action.type) {
            case actionConstants[`LOAD_${name.toUpperCase()}`]:
                return {...defaultValue};
            case actionConstants[`LOAD_${name.toUpperCase()}_SUCCESS`]:
                return {...action.payload.data};
            default:
                return state;
        }
    }
}

const arrayReducerFactory = (name, defaultValue = []) => {
    return (state = {}, action) => {
        switch (action.type) {
            case actionConstants[`LOAD_${name.toUpperCase()}`]:
                return [...defaultValue];
            case actionConstants[`LOAD_${name.toUpperCase()}_SUCCESS`]:
                return [...action.payload.data];
            default:
                return state;
        }
    }
}

export default {
    errors,
    loading,
    myself: objectReducerFactory('myself', {Projects:[]}),
    employer: objectReducerFactory('employer', {Projects:[], References:[]}),
    employers: arrayReducerFactory('employers'),
    project: objectReducerFactory('project', {Employer:{}, Tags:[], Images:[]}),
    projects: arrayReducerFactory('projects'),
    tag: objectReducerFactory('tag', {Projects:[]}),
    tags: arrayReducerFactory('tags')
};