import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/global"
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Header } from "./components/Header";
import { darkTheme, lightTheme } from "./styles/themes";

import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(darkTheme);  

  const toggleTheme = () => {
    setTheme(theme == lightTheme ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header toggleTheme={toggleTheme}/>
        <Router />
      </BrowserRouter>
      <GlobalStyle />      
    </ThemeProvider>
  )
}

export default App
