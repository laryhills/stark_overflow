import styled from "styled-components";

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.forum.topicCard.background};
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #7c3aed;
  }
`;

export const Input = styled.input`
  background: none;
  border: none;
  padding: 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  width: 300px;
  outline: none;
  line-height: 19px;
  font-size: 1rem;
`;