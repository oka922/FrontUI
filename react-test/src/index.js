import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
//実際にviewする

ReactDOM.render(
  <div>
  <App />
  <App txt={"aaaa"} />
  <App txt={"goje"}/>
  </div>,
  document.getElementById('root')
);
