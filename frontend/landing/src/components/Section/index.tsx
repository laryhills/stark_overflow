import { SectionContainer } from "./style";

interface SectionProps {
  children?: React.ReactNode;
}

export function Section({ children }: SectionProps) {
  return (
    <SectionContainer>
      {children}
    </SectionContainer>
  )
}