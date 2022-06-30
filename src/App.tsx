import Router from "./Router";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeAtom } from "./atoms";
import darkMode from "./img/darkMode.png";
import lightMode from "./img/lightMode.png";
import homePng from "./img/home.png";

const Reset = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  *{
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    background-color:${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
 
`;
const ThemeBtn = styled.button`
  position: relative;
  top: 50%;
  left: 79%;
  width: 50px;
  height: 50px;
  margin: 20px 5px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: white;
  cursor: pointer;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1, 1.1);
  }
  img {
    width: 70%;
  }
`;

function App() {
  const theme = useRecoilValue(themeAtom);
  const setTheme = useSetRecoilState(themeAtom);
  const toggleTheme = () => setTheme((val) => !val);
  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Reset />
        <ThemeBtn onClick={toggleTheme}>
          <img src={theme ? lightMode : darkMode} alt="themeImg" />
        </ThemeBtn>
        <ThemeBtn>
          <a href="/c-trackers">
            <img src={homePng} alt="home" />
          </a>
        </ThemeBtn>
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
