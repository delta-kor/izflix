import React from 'react';
import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import ModalProvider from './providers/ModalProvider';
import reportWebVitals from './reportWebVitals';
import isCrawler from './services/crawl';
import delay from './services/delay';
import './services/i18n';
import Tracker from './services/tracker';

Tracker.initialize();

const rootElement = document.getElementById('root')!;

const app = (
  <React.StrictMode>
    <GlobalStyle />
    <ModalProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>
);

const minimumDelay = 2000;
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
  if (timeDelta < minimumDelay) {
    await delay(minimumDelay - timeDelta);
  }

  document.body.classList.replace('dry', 'hydrating');
  await delay(200);
  document.body.classList.replace('hydrating', 'hydrated');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
