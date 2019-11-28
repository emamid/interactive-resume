function getLoadConstants(name) {
    return {
        [`LOAD_${name}`]: `LOAD_${name}`,
        [`LOAD_${name}_FAILURE`]: `LOAD_${name}_FAILURE`,
        [`LOAD_${name}_SUCCESS`]: `LOAD_${name}_SUCCESS`
    }
}

const actionConstants = {
    ...getLoadConstants('EMPLOYER'),
    ...getLoadConstants('EMPLOYERS'),
    ...getLoadConstants('PROJECT'),
    ...getLoadConstants('PROJECTS'),
    ...getLoadConstants('TAG'),
    ...getLoadConstants('TAGS'),
    ...getLoadConstants('MYSELF')
};

export default actionConstants;