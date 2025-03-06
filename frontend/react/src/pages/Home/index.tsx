import reactjsLogo from "@logos/reactjs.webp";
import nodejsLogo from "@logos/nodejs.webp";
import pythonLogo from "@logos/python.svg";
import javaLogo from "@logos/java.webp";
import { Cards } from "./Cards";
import { HomeContainer } from "./style";

const forumsList = [
  { name: "ReactJS", icon: reactjsLogo, topics: 15, amount: "2500,00", path: "reactjs" },
  { name: "Node.js", icon: nodejsLogo, topics: 11, amount: "1850,00", path: "nodejs" },
  { name: "Python", icon: pythonLogo, topics: 3, amount: "700,00", path: "python" },
  { name: "Java", icon: javaLogo, topics: 3, amount: "2700,00", path: "java" },
];

export type ForumsList = typeof forumsList;

export function Home() {
  return (
    <HomeContainer>
      <h1>Fóruns</h1>
      
      <Cards forums={forumsList} />
    </HomeContainer>
  );
}
