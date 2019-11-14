import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";

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

export default GlobalStyles;
