export const RECEIVE_VIEWS = 'RECEIVE_VIEWS';
export const REQUEST_TABLE = 'REQUEST_TABLE';
export const RECEIVE_TABLE = 'RECEIVE_TABLE';
export const SELECT_VIEW = 'SELECT_VIEW';

const HOST = 'https://test.dsocx.com';

export const selectView = view => ({
  type: SELECT_VIEW,
  view
});

export const receiveViews = data => ({
  type: RECEIVE_VIEWS,
  views: data
});

export const requestTable = () => ({
  type: REQUEST_TABLE
});

export const receiveTable = (data, startsAt) => ({
  type: RECEIVE_TABLE,
  tableData: data,
  startsAt: startsAt
});

export const fetchViews = (documentName, tableId) => dispatch => {

  return fetch(HOST + `/api/data/views/${documentName}/${tableId}`)
    .then(response => response.json())
    .then(data => dispatch(receiveViews(data)))
};

export const fetchTable = (documentName, tableId, viewId, pageSize, startsAt = 0) => dispatch => {
  
  dispatch(requestTable());
  
  var params = [`limit=${pageSize}`, `start=${startsAt}`, `viewid=${encodeURI(viewId)}`];
  
  return fetch(HOST + `/api/data/tables/${documentName}/${tableId}?` + params.join('&'))
    .then(response => response.json())
    .then(data => dispatch(receiveTable(data, startsAt + pageSize)))
};