import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import reportWebVitals from './reportWebVitals';
import isCrawler from './services/crawl';

const app = (
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const rootElement = document.getElementById('root')!;
const isHydrationNeeded = !isCrawler();
render(
  app,
  rootElement,
  () => isHydrationNeeded && rootElement.classList.replace('dry', 'hydrated')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
