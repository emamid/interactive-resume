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

const objectReducerFactory = (name) => {
    return (state = {}, action) => {
        switch (action.type) {
            case actionConstants[`LOAD_${name.toUpperCase()}`]:
                return {};
            case actionConstants[`LOAD_${name.toUpperCase()}_SUCCESS`]:
                return {...action.payload.data};
            default:
                return state;
        }
    }
}

const arrayReducerFactory = (name) => {
    return (state = {}, action) => {
        switch (action.type) {
            case actionConstants[`LOAD_${name.toUpperCase()}`]:
                return [];
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
    myself: objectReducerFactory('myself'),
    employer: objectReducerFactory('employer'),
    employers: arrayReducerFactory('employers'),
    project: objectReducerFactory('project'),
    projects: arrayReducerFactory('projects'),
    tag: objectReducerFactory('tag'),
    tags: arrayReducerFactory('tags')
};