import { MemberCard, MemberCardProps } from '../MemberCard';
import {
  ShowcaseContainer,
  ShowcaseTitle,
  ShowcaseSubtitle,
  MembersGrid
} from './styles';

interface ShowcaseProps {
  title: string;
  subtitle: string;
  members: MemberCardProps[];
}

export function Showcase({ title, subtitle, members }: ShowcaseProps) {
  // Split the title to apply different color to the first part
  const titleParts = title.split(' ');
  const greenPart = titleParts.slice(0, -1).join(' ');
  const whitePart = titleParts[titleParts.length - 1];

  return (
    <ShowcaseContainer>
      <ShowcaseTitle>
        <span>{greenPart}</span> {whitePart}
      </ShowcaseTitle>
      <ShowcaseSubtitle>{subtitle}</ShowcaseSubtitle>
      <MembersGrid>
        {members.map((member) => (
          <MemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            description={member.description}
            image={member.image}
            socials={member.socials}
          />
        ))}
      </MembersGrid>
    </ShowcaseContainer>
  );
}
