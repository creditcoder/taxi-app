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
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    &:focus,
    &:active {
      outline: none;
    }
  }
  h1,h2,h3,h4,h5,h6{
    font-family: 'Jura', sans-serif;
  }
`;
export default GlobalStyles;
