import { Header } from "@components/Header";
import { HowItWorksContainer, Note, Step } from "./style";
import { Section } from "@components/Section";

export function HowItWorks() {
  return (
    <HowItWorksContainer>
      <Header title="How It Works" />
      <Section>
        <Step>Users post a question and lock funds in a smart contract.</Step>
        <Step>Others can boost the reward.</Step>
        <Step>Experts provide answers.</Step>
        <Step>The question author selects the best response.</Step>
        <Step>The locked amount is transferred to the expert.</Step>
        <Note>💡 Automation via Smart Contracts ensures transparency and security.</Note>
      </Section>
    </HowItWorksContainer>
  )
}