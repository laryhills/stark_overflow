import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/themes";
import { Navbar } from "@components/Navbar";
import { Hero } from "./sections/Hero";
import { Sponsors } from "./sections/Sponsors";
import { useTheme } from "./hooks/useTheme";
import { ProblemAndSolution } from "./sections/ProblemAndSolution";
import { Team } from "./sections/Team";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

export function App() {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Navbar toggleTheme={toggleTheme} />
      <Container>
        <Hero />
        <ProblemAndSolution />
        <Sponsors />
        <Team />
      </Container>
      <GlobalStyles />
    </ThemeProvider>
  );
}
