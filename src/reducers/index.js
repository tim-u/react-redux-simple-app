import { combineReducers } from 'redux'
import { RECEIVE_VIEWS, SELECT_VIEW, REQUEST_TABLE, RECEIVE_TABLE } from '../actions'

const selectedView = (state = 'Default', action) => {
  switch (action.type) {
    case SELECT_VIEW:
      return action.view;
    default:
      return state;
  }
};

const sidebar = (state = { views: [] }, action) => {
  switch (action.type) {
    case RECEIVE_VIEWS:
      return {
        ...state,
        views: action.views
      };
    default:
      return state
  }
};

const table = (state = { isFetching: false, tableData: [], startsAt: 0, pageSize: 50 }, action) => {
  switch (action.type) {
    case REQUEST_TABLE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_TABLE:

      // append next batch
      if(action.tableData.start !== 0 && state.tableData.data)
      {
        action.tableData.data = state.tableData.data.concat(action.tableData.data);
      }
      
      return {
        ...state,
        isFetching: false,
        tableData: action.tableData
      };
    default:
      return state
  }
};

const rootReducer = combineReducers({
  selectedView,
  sidebar,
  table
});

export default rootReducer
