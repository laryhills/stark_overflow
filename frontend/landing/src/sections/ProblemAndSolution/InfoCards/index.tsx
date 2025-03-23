import { InfoCard, InfoCardsContainer } from "./styles";

export function InfoCards() {
  return (
    <InfoCardsContainer>
      <InfoCard>
        <h1>The Problem</h1>
        <p>Traditional forums offer no financial incentives for experts. High-quality answers take too long or never arrive.</p>
      </InfoCard>
      <InfoCard>
        <h1>The Solution</h1>
        <p>A decentralized forum where questions have crypto-based rewards. Users deposit funds when posting questions.</p>
      </InfoCard>
    </InfoCardsContainer>
  )
}