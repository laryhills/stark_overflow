import styled from "styled-components"

export const SponsorsContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 60px;
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 40px;
  }
`

export const SponsorsItens = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const SponsorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  svg {
    color: ${({ theme }) => theme.textSecondary};
  }
  
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.textSecondary};
  }
`

