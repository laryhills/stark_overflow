import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { MemberCardContainer, MemberDescription, MemberImage, MemberName, MemberRole, SocialLink, SocialLinks } from "./styles";

export interface MemberCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
  socials: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    x?: string;
  };
}

export function MemberCard({ name, role, description, image, socials }: MemberCardProps) {
  return (
    <MemberCardContainer>
      <MemberImage src={image} alt={name} />
      <MemberName>{name}</MemberName>
      <MemberRole>{role}</MemberRole>
      <MemberDescription>{description}</MemberDescription>
      <SocialLinks>
        {socials.linkedin && (
          <SocialLink href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn profile`}>
            <LinkedinLogo weight="fill" />
          </SocialLink>
        )}
        {socials.facebook && (
          <SocialLink href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Facebook profile`}>
            <FacebookLogo weight="fill" />
          </SocialLink>
        )}
        {socials.instagram && (
          <SocialLink href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Instagram profile`}>
            <InstagramLogo weight="fill" />
          </SocialLink>
        )}
        {socials.github && (
          <SocialLink href={socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Github profile`}>
            <GithubLogo weight="fill" />
          </SocialLink>
        )}
        {socials.x && (
          <SocialLink href={socials.x} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s X profile`}>
            <XLogo weight="fill" />
          </SocialLink>
        )}
      </SocialLinks>
    </MemberCardContainer>
  )
}