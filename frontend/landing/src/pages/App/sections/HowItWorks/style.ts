import styled from "styled-components";

export const HowItWorksContainer = styled.div`
  position: relative;
  grid-area: howitworks;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px 0;
`;

export const Step = styled.article`
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

export const Note = styled.p`
  font-size: 0.8em;
  color: #666;
`;