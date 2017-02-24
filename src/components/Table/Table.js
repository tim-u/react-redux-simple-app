import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Table.css'

class Table extends Component {

  componentDidUpdate() {

    this.addScrollListener();
    const { data, isFetching } = this.props;

    // scroll to the top when switching a view
    if(!isFetching && data.start === 0)
    {
      ReactDOM.findDOMNode(this).scrollTop = 0;
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  addScrollListener() {
    ReactDOM.findDOMNode(this).addEventListener('scroll', this.onScroll.bind(this));
  }

  removeScrollListener() {
    ReactDOM.findDOMNode(this).removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this);
    const { data, fetchMore, isFetching } = this.props;

    // fetch more data when scrolled to the bottom
    if(!isFetching && data.end < data.total && el.scrollTop + el.clientHeight >= el.scrollHeight) {
      this.removeScrollListener();
      fetchMore(data.end);
    }
  }

  render()
  {
    const { data } = this.props || {};
    const columns = data.columns || [];
    const rows = data.data || [];

    // keep the column visibility to hide columns
    var colVisibility = columns.reduce((a,b) => { a[b.dataindex] = b.visible; return a; }, {});

    const isVisible = (value, index) => colVisibility[index];

    return (
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="list">
            <tr>
            {columns.filter(isVisible).map((column, i) =>
              <th key={i}>{column.title}</th>
            )}
            </tr>
          </thead>
          <tbody>
          {rows.map((row, i) =>
            <tr key={i}>
            {row.filter(isVisible).map((value, j) =>
              <td key={j}>{value}</td>
            )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
