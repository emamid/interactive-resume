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
        case actionConstants.LOAD_MYSELF_ERROR:
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

const reducerFactory = (name, defaultValue) => {
    
    return (state = [], action) => {
        switch (action.type) {
            case actionConstants[`LOAD_${name}_REQUEST`]:
                return defaultValue;
            case actionConstants[`LOAD_${name}_SUCCESS`]:
                return action[name];
            default:
                return state;
        }
    }
}

const objectReducerFactory = (name) => {
    return reducerFactory(name, {});
}

const arrayReducerFactory = (name) => {
    return reducerFactory(name, []);
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