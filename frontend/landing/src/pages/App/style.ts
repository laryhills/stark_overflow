import styled from 'styled-components';

export const Container = styled.div`
  color: white;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20vh 80vh 100vh 100vh 100vh 100vh 20vh;
  grid-template-areas: 
    "header"
    "firstview" 
    "theproblem" 
    "thesolution"
    "howitworks"
    "marketpotential"
    "footer";
  padding: 12px;
`;

export const Header = styled.header`
  grid-area: header;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
`;

export const Logo = styled.img`
  width: 12rem;
  animation: spin 4s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes spin {
    0% {
        transform: translateX(24px) rotateY(0deg);
    }
    80% {
        transform: translateX(24px) rotateY(360deg);
    }
    100% {
        transform: translateX(24px) rotateY(360deg);
    }
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

export const FirstView = styled.div`
  grid-area: firstview;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Main = styled.main`
  text-align: center;
  margin-top: 3rem;
  max-width: 800px;

`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 4rem;
  width: 100%;
`;

export const Card = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const Footer = styled.footer`
  grid-area: footer;
  margin-top: 3rem;
  padding: 16px;
  border-top: 1px solid #444;
  text-align: center;
  width: 100%;
  color: #aaa;
`;