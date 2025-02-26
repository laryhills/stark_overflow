import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    cursor: pointer;
  }
`;