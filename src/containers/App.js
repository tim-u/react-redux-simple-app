import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectView, fetchTable, fetchViews } from '../actions'
import Sidebar from '../components/Sidebar/Sidebar'
import Table from '../components/Table/Table'
import Spinner from '../components/Spinner/Spinner'

const DOCUMENT_ID = 1;
const TABLE_NAME = 'activities';

class App extends Component {
  static propTypes = {
    selectedView: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {

    const { dispatch, selectedView, pageSize } = this.props;

    // populate views
    dispatch(fetchViews(DOCUMENT_ID, TABLE_NAME));
    dispatch(fetchTable(DOCUMENT_ID, TABLE_NAME, selectedView, pageSize));
  }

  componentWillReceiveProps(nextProps) {

    // fetch new data if required
    if(nextProps.selectedView !== this.props.selectedView)
    {
      const { dispatch, selectedView, pageSize } = nextProps;
      dispatch(fetchTable(DOCUMENT_ID, TABLE_NAME, selectedView, pageSize));
    }
  }

  handleChange = nextView => {
    this.props.dispatch(selectView(nextView));
  };

  fetchNextData = (startsAt) => {
    const { dispatch, selectedView, pageSize } = this.props;
    dispatch(fetchTable(DOCUMENT_ID, TABLE_NAME, selectedView, pageSize, startsAt));
  };

  render() {
    const { views, selectedView, tableData, isFetching } = this.props;

    return (
      <div style={{height: '100%'}}>
        <Spinner isFetching={isFetching}/>
        <Sidebar views={views} selectedView={selectedView} onClick={this.handleChange}/>
        <Table data={tableData} isFetching={isFetching} fetchMore={this.fetchNextData}/>
      </div>
    )
  }
}

const mapStateToProps = state => {

  const { pageSize, isFetching, tableData } = state.table;

  return {
    views: state.sidebar.views || [],
    selectedView: state.selectedView,
    pageSize,
    isFetching,
    tableData
  };
};

export default connect(mapStateToProps)(App)
