import { X } from '@phosphor-icons/react'
import { Article, TheProblemContainer } from './style'
import { Header } from '@components/Header'
import { Section } from '@components/Section'

export function TheProblem() {
  return (
    <TheProblemContainer>
      <Header title="The Problem" subtitle="No Financial Incentives" />
      <Section>
        <Article>
          <p>
            <X size={32} color="#e60a0a" weight="bold" />
            Traditional forums (Stack Overflow, Reddit) do not offer financial incentives for experts to answer difficult questions.
          </p>
        </Article>
        <Article>
          <p>
            <X size={32} color="#e60a0a" weight="bold" />
            High-quality answers take too long or never arrive.
          </p>
        </Article>
        <Article>
          <p>
            <X size={32} color="#e60a0a" weight="bold" />
            The current model is based only on reputation, without real rewards.
          </p>
        </Article>
      </Section>
    </TheProblemContainer>
  )
}