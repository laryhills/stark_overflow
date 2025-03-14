import { Header } from "@components/Header";
import { Article, MarketPotentialContainer, Subtitle } from "./style";
import { Section } from "@components/Section";

export function MarketPotential() {
  return (
    <MarketPotentialContainer>
      <Header title="Market Potential"/>
      <Section>
        <Article>
          <Subtitle>Market Size</Subtitle>
          <p>✅ The global market size for question-and-answer platforms is $1.5 billion.</p>
        </Article>
        <Article>
          <Subtitle>Market Growth</Subtitle>
          <p>✅ The market is expected to grow at a CAGR of 20% over the next 5 years.</p>
        </Article>
        <Article>
          <Subtitle>Market Trends</Subtitle>
          <p>✅ The market is moving towards decentralized platforms.</p>
        </Article>
      </Section>
    </MarketPotentialContainer>
  )
}