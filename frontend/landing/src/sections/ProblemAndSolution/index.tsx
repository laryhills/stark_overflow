import { FlowCards } from './FlowCards'
import { InfoCards } from './InfoCards'
import { Section, Title } from './style'

export function ProblemAndSolution() {
  return (   
    <Section>
      <InfoCards />
      <Title>How it <span>Works</span> Step-by-Step Guide</Title>
      <FlowCards />
    </Section> 
  )
}