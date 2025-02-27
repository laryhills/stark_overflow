import styled from "styled-components";

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 900px;

`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackground};
  padding: 2rem 1.25rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};

  img {
    width: 72px;
    height: 68px;
    border-radius: 50%;
  }

  section {
    display: flex;
    flex-direction: column;

    small {
      font-size: 0.625rem;
      color: #8d8d99;
    }
    strong {
      font-size: 1rem;
      font-weight: bolder;
      color: ${(props) => props.theme.text};
    }

    div {
      display: flex;
      margin-top: 0.625rem;
      gap: 1rem;

      span {
        display: flex;
        gap: 0.25rem;
        font-size: 0.75rem;
        align-items: center;
      }
    }
  }
`