import { ForumCard,  HomeContainer } from "./style";

const forums = [
  { name: "ReactJS", icon: "⚛", topics: 15, comments: 25, time: "1 dia" },
  { name: "Node.js", icon: "🟢", topics: 11, comments: 18, time: "1 dia" },
  { name: "Python", icon: "🐍", topics: 3, comments: 7, time: "8 horas" },
];

export function Home() {
  return (
    <HomeContainer>      
      <div>
        {forums.map((forum, index) => (
          <ForumCard key={index}>
            <span>{forum.icon} {forum.name}</span>
            <small>{forum.topics} tópicos - {forum.comments} comentários - {forum.time}</small>
          </ForumCard>
        ))}
      </div>
    </HomeContainer>
  );
}
