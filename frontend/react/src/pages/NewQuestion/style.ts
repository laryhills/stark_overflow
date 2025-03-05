import styled from "styled-components";

export const Container = styled.div`
  background: #121214;
  color: #E1E1E6;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  margin: auto;

  h2 {
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;

export const TitleInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #29292E;
  border-radius: 5px;
  background: #202024;
  color: #E1E1E6;
`;

export const DescriptionTextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  height: 100px;
  border: 1px solid #29292E;
  border-radius: 5px;
  background: #202024;
  color: #E1E1E6;
  resize: none;
`;

export const AmountInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #29292E;
  border-radius: 5px;
  background: #202024;

  input {
    background: transparent;
    border: none;
    color: #E1E1E6;
    outline: none;
    width: 100%;
  }

  svg {
    color: #8257E5;
  }
`;

export const RepositoryInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #29292E;
  border-radius: 5px;
  background: #202024;

  input {
    background: transparent;
    border: none;
    color: #E1E1E6;
    outline: none;
    width: 100%;
  }

  svg {
    color: #8257E5;
  }
`;

export const TagsInput = styled(RepositoryInput)``;

export const Button = styled.button<{ variant: "cancel" | "publish" }>`
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  
  ${({ variant }) =>
    variant === "publish"
      ? `background: #8257E5; color: white;`
      : `background: #29292E; color: #E1E1E6;`}

  &:hover {
    opacity: 0.8;
  }
`;
