import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ForumCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 10px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;