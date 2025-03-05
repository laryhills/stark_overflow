import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  a {
    margin: 0 auto;
    transform: translateX(24px);
  }
`;

export const Logo = styled.img`
  width: 10rem;
`;

export const ToggleThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;