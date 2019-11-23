function getLoadConstants(name) {
    return {
        [`LOAD_${name}_REQUEST`]: `LOAD_${name}_REQUEST`,
        [`LOAD_${name}_ERROR`]: `LOAD_${name}_ERROR`,
        [`LOAD_${name}_SUCCESS`]: `LOAD_${name}_SUCCESS`
    }
}

const actionConstants = {
    ...getLoadConstants('EMPLOYER'),
    ...getLoadConstants('EMPLOYERS'),
    ...getLoadConstants('PROJECT'),
    ...getLoadConstants('PROJECT'),
    ...getLoadConstants('TAG'),
    ...getLoadConstants('TAGS'),
    ...getLoadConstants('MYSELF')
};

export default actionConstants;