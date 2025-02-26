import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/global"
import { darkTheme, lightTheme } from "./styles/themes/default"
import { Header } from "./components/Header"
import { useState } from "react";
import { Home } from "./pages/Home";

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Home />
      <GlobalStyle />      
    </ThemeProvider>
  )
}

export default App
