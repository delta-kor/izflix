import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffffff;
  -webkit-tap-highlight-color: transparent;
}

body {
  background: #070d2d;
  font-family: 'NanumSquare', sans-serif;
  overflow-y: overlay;
}

input {
  font-family: 'NanumSquare', sans-serif;
}

body:lang(zh) {
  font-family: sans-serif;
}

body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-thumb {
  background: rgba(69, 75, 107, 0.5);
  border-radius: 8px 0 0 8px;
}

body::-webkit-scrollbar-thumb:hover {
  background: rgba(69, 75, 107, 0.7);
}

body::-webkit-scrollbar-thumb:active {
  background: rgba(69, 75, 107, 0.95);
}

.ReactModal__Overlay {
  opacity: 0;
  transition: opacity 200ms;
}

.ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
}
`;

export default GlobalStyle;
