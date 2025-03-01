import { SearchInput } from "./SearchInput";
import { Button, ForumContainer, ForumList, Header, TopicAvatar, TopicCard, TopicFooter, TopicInfo, TopicMeta, TopicTitle } from "./style";
import { CheckCircle, CurrencyDollar, Question } from "phosphor-react";

export function Forum() {
  const topics = [
    {
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "Testes unitários em componentes que usam Design System",
      author: "Maicon Domingues",
      time: "hoje às 11:47",
      amount: "2500,00",
      state: "open",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "[Dica] Carrossel com Keen-Slider",
      author: "Jordane Chaves Ferreira Rocha",
      time: "ontem às 22:15",
      amount: "1850,00",
      state: "closed",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "Figma desafio 1 - React (DevMode)",
      author: "Vitor Antonio Danner da Silva",
      time: "ontem às 19:07",
      amount: "700,00",
      state: "open",
    },
  ];

  return (
    <ForumContainer>
      <Header>
        <SearchInput />
        <Button>Novo Tópico</Button>
      </Header>
      <ForumList>
        {topics.map((topic, index) => (
          <TopicCard key={index}>
            <TopicInfo>
              <TopicAvatar src={topic.avatar} alt={topic.author} />
              <div>
                <TopicTitle>
                  {topic.state === "open" 
                    ? <Question size={18} color="#d4821e" weight="fill" /> 
                    : <CheckCircle size={18} color="#2e8b57" weight="fill" />
                  }
                  <h3>{topic.title}</h3>                  
                </TopicTitle>
                <TopicMeta>
                  {topic.author}
                  <time>{topic.time}</time>
                </TopicMeta>
              </div>
            </TopicInfo>
            <TopicFooter>
              <CurrencyDollar size={24} color="#25c028" weight="fill" />
              <span>{topic.amount}</span>
            </TopicFooter>
          </TopicCard>
        ))}
      </ForumList>
    </ForumContainer>
  );
};