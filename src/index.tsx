import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import delay from './delay';
import GlobalStyle from './GlobalStyle';
import reportWebVitals from './reportWebVitals';
import isCrawler from './services/crawl';
import Tracker from './services/tracker';

Tracker.initialize();

const app = (
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const rootElement = document.getElementById('root')!;

const renderStartTime = Date.now();
render(app, rootElement, hydrate);

async function hydrate() {
  if (isCrawler()) {
    document.body.classList.replace('dry', 'hydrated');
    document.body.classList.add('snapped');
    return true;
  }

  document.body.classList.remove('snapped');

  const hydrationTime = Date.now();
  const timeDelta = hydrationTime - renderStartTime;
  if (timeDelta < 2000) {
    await delay(2000 - timeDelta);
  }

  document.body.classList.replace('dry', 'hydrating');
  await delay(200);
  document.body.classList.replace('hydrating', 'hydrated');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
