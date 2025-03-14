import styled from "styled-components";

export const TheSolutionContainer = styled.div`
  position: relative;
  grid-area: thesolution;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px 0;
`;

export const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 0.5em;
`;

export const Article = styled.article`
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    display: flex;
    align-items: center;
    gap: 10;
    margin: 0;
    font-size: 1em;
  }
`;