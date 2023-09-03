import { createGlobalStyle } from 'styled-components';
import { Color } from './styles';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  text-decoration: none;
  color: ${Color.WHITE};
  -webkit-tap-highlight-color: transparent;
}

body {
  background: ${Color.BACKGROUND};
  font-family: 'NanumSquare', sans-serif;
  overflow-y: overlay;
}

input {
  font-family: 'NanumSquare', sans-serif;
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
`;

export default GlobalStyle;
