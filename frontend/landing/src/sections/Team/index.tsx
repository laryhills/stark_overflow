import { Showcase } from "./ShowCase";
import { TeamContainer } from "./styles";

export function Team() {
  const teamMembers = [
    {
      name: 'Müller Esposito',
      role: 'Founder & CEO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'https://avatars.githubusercontent.com/u/20048394?v=4',
      socials: {
        linkedin: 'https://linkedin.com/in/mulleresposito',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Arnaelcio Gomes',
      role: 'Co-Founder & CTO',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'https://avatars.githubusercontent.com/u/69821849?v=4',
      socials: {
        linkedin: 'https://www.linkedin.com/in/arnaelciogomespereira/',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com'
      }
    },
  ];
  return (
    <TeamContainer>
      <Showcase 
        title="Our Dedicated Crew"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!"
        members={teamMembers}/>
    </TeamContainer>    
  );
}
