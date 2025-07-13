import { NavLink } from "react-router-dom";
import { Card, CardsContainer } from "./style";
import { ChatCircleDots, CurrencyDollar } from "phosphor-react";
import { Forum } from "@app-types/index";

interface CardsProps {
  forums: Forum[];
}

export function Cards({ forums }: CardsProps) {
  return (
    <CardsContainer>
      {forums.map((forum) => (
        <NavLink to={`/forum/${forum.id}`} key={forum.id}>
          <Card>
            <img src={forum.icon_url} alt={forum.name} />
            <section>
              <small>FÓRUM</small>
              <strong>{forum.name}</strong>
              <div>
                <span>
                  <ChatCircleDots size={18} /> {forum.total_questions}
                  <CurrencyDollar size={18} weight="bold" color="green" /> ${forum.amount}
                </span>
              </div>
            </section>
          </Card>
        </NavLink>
      ))}
    </CardsContainer>
  )
}