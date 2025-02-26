import { CardsContainer, ForumCard,  HomeContainer } from "./style";
import { ChatCircleDots, Coins, CurrencyDollar } from "phosphor-react";

import reactjsLogo from "@logos/reactjs.webp";
import nodejsLogo from "@logos/nodejs.webp";
import pythonLogo from "@logos/python.svg";
import javaLogo from "@logos/java.webp";
import { NavLink } from "react-router-dom";
const forums = [
  { name: "ReactJS", icon: reactjsLogo, topics: 15, amount: 2500, path: "reactjs" },
  { name: "Node.js", icon: nodejsLogo, topics: 11, amount: 1850, path: "nodejs" },
  { name: "Python", icon: pythonLogo, topics: 3, amount: 700, path: "python" },
  { name: "Java", icon: javaLogo, topics: 3, amount: 2700, path: "java" },
];

export function Home() {
  return (
    <HomeContainer>
      <h1>Fóruns</h1>
      
      <CardsContainer>
        {forums.map((forum, index) => (
          <NavLink to={`/forum/${forum.path}`}>
            <ForumCard key={index}>
              <img src={forum.icon} alt={forum.name} />
              <section>
                <small>FÓRUM</small>
                <strong>{forum.name}</strong>
                <div>
                  <span>
                    <ChatCircleDots size={18}/> {forum.topics} 
                    <CurrencyDollar size={18}/> {forum.amount}
                  </span>
                </div>
              </section>
            </ForumCard>
          </NavLink>
        ))}
      </CardsContainer>
    </HomeContainer>
  );
}
