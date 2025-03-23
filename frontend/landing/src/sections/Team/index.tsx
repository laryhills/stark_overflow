import React from "react";
import { MemberCardProps } from "./MemberCard";
import { Showcase } from "./ShowCase";
import { TeamContainer } from "./styles";

interface TeamProps extends React.HTMLAttributes<HTMLDivElement> {
  teamMembers: MemberCardProps[];
}

export function Team({ teamMembers, ...props }: TeamProps) {
  return (
    <TeamContainer {...props}>
      <Showcase 
        title="Our Dedicated Crew"
        subtitle=""
        members={teamMembers}/>
    </TeamContainer>    
  );
}
