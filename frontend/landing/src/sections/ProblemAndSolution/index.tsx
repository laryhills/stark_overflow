import { FlowCards } from './FlowCards'
import { InfoCards } from './InfoCards'
import { Section, Title } from './style'

interface ProblemAndSolutionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProblemAndSolution({ ...props }: ProblemAndSolutionProps){
  return (   
    <Section {...props}>
      <InfoCards />
      <Title>How it <span>Works</span> Step-by-Step Guide</Title>
      <FlowCards />
    </Section> 
  )
}