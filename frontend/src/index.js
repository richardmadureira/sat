import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);