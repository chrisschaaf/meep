// FILTER_BY_RANGE
export const setRangeFilter = (range = 25) => ({
  type: 'FILTER_BY_RANGE',
  range: parseInt(range),
});

// ADD_TYPE_FILTER
// REMOVE_TYPE_FILTER
export const setTypeFilter = (projectType = null) => ({
  type: projectType ? 'ADD_TYPE_FILTER' : 'REMOVE_TYPE_FILTER',
  project_type: projectType,
});

// SET_ZIPCODE
export const setZipCode = (zipcode) => ({
  type: 'SET_ZIPCODE',
  zipcode: parseInt(zipcode),
});
