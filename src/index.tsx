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
import Tracker from './services/tracker';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './services/i18n';

Tracker.initialize();

if (Tracker.isActivated()) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({ maskAllText: false, blockAllMedia: false }),
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 0.05,
  });
  console.log('Sentry initialized');
}

const rootElement = document.getElementById('root')!;
const splashTextElement = document.getElementById('splash-text');

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

const splashTexts = [
  '열두 가지 색색깔의 무지개',
  'Have you ever seen this color?',
  '힘들었던 시간은 이제 사라져버리고',
  '밝은 빛이되어 노래 할게',
  '찬란하게 빛나는 눈빛',
  '우리만의 기적을 만들어',
  '싱그러운 하늘에 너의 이름 담아',
  '저 멀리 사라진 그 빛을 따라',
  '빛나는 꿈을 꿔 오늘도',
  '밤하늘의 별은 빛이 되고',
  '따스한 두 손을 잡고서 꿈꿀 수 있게',
  '저기 반짝이는 작은 별을 따라서',
  '별빛 활주로를 따라 더 높이',
  '푸른 바다 위를 날아 저 멀리',
  '파란 하늘 끝까지 올라가',
  '시간이 멈췄으면 해',
  '언제나 오늘을 기억해',
  "Now I'm crazy for you",
  '색색의 꽃을 피우고',
  '영원토록 뜨겁게 지지 않을게',
  '벚꽃 아래 마주 보며 선 너와 나',
  "I'm always with you",
  "We'll be forever",
  '언젠가 우리의 밤도 모두 지나가겠죠',
  '여긴 슬픈 엔딩은 없어',
  '예쁘던 우리 기억들로 꽃이 필 거야',
  '우리의 스토리를 만들어 가면 돼',
  '다시 한번 지나가는 그때 계절의 풍경',
  '깊은 어둠 속 빛나는 별처럼',
  '우린 어디서든 서로 알아볼 수 있어',
  '처음 만난 그 순간처럼',
  '이제 같이 날아가',
  '마주 손잡고 걸어봐요 아주 천천히',
  '너와의 기억은 기적 같아',
  '평행선을 따라 걷다보면',
];

const text = splashTexts[Math.floor(Math.random() * splashTexts.length)];
splashTextElement && (splashTextElement.textContent = text);
