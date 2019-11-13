import reset from "styled-reset";
import bgImage from "./images/bg.jpg";
import styled, { createGlobalStyle } from "./typed-components";

const Layout = styled.div`
  height: 100vh;
  background: url(${bgImage}) center no-repeat;
  background-size: cover;
`;

// tslint:disable-next-line
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  @import url('https://fonts.googleapis.com/css?family=Jura&display=swap');
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Jura', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button,
  select {
    &:focus,
    &:active {
      outline: none;
    }
  }
`;

export { Layout };
export default GlobalStyles;
