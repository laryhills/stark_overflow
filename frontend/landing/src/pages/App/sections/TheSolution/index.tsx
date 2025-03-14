import { Header } from '@components/Header';
import { Article, Subtitle, TheSolutionContainer } from './style';
import { Section } from '@components/Section';

export function TheSolution() {
  return (
    <TheSolutionContainer>
      <Header title="The Solution"/>

      <Section>
        <Article>
          <Subtitle>Financial Incentives</Subtitle>
          <p>✅ A decentralized forum where questions have crypto-based rewards.</p>
        </Article>
        <Article>
          <Subtitle>Scalable Reward System</Subtitle>
          <p>✅ Users deposit an amount when posting a question. Others can increase the reward.</p>
        </Article>
        <Article>
          <Subtitle>Competitiveness</Subtitle>
          <p>✅ The first to provide an accepted solution receives the reward.</p>
        </Article>
      </Section>
    </TheSolutionContainer>
  );
}