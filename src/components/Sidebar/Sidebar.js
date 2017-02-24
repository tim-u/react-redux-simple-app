import React from 'react'
import './Sidebar.css'

const Sidebar = ({ views, selectedView, onClick }) => (
  <div className="sidebar">
    <ul className="list">
      {views.map((view, i) =>
        <li key={i} onClick={e => onClick(view)}
            className={"item " + (selectedView === view ? "active" : "")}>
          {view.split('\n').map((v,i) => <div key={i}>{v}</div>)}
        </li>
      )}
    </ul>
  </div>
);

export default Sidebar
