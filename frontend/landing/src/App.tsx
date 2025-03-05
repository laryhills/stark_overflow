import StarkOverflowLogo from './assets/starkoverflow.svg';
import { Button, Card, Container, Footer, Header, Logo, Main, Section } from './style';

function App() {

  return (
    <Container>
      <Header>
        <Logo src={StarkOverflowLogo}/>
      </Header>

      <Main>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>The Revolution of Problem Solving</h2>
        <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '20px 0' }}>
          A decentralized platform that financially rewards those who share knowledge.
          Deposit funds into questions and encourage high-quality answers.
        </p>
        <Button>Learn More</Button>
      </Main>

      <Section>
        <Card>
          <h3>Incentive System</h3>
          <p>Accepted answers receive financial rewards, ensuring quality.</p>
        </Card>
        <Card>
          <h3>Web3 and Smart Contracts</h3>
          <p>Everything is recorded in smart contracts, bringing transparency.</p>
        </Card>
        <Card>
          <h3>Engaged Community</h3>
          <p>A space for developers, enthusiasts, and experts.</p>
        </Card>
      </Section>

      <Footer>
        <p>&copy; 2025 Stark Overflow - All rights reserved.</p>
      </Footer>
    </Container>
  )
}

export default App
