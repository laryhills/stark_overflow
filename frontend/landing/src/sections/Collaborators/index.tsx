import { CircleWavyCheck } from "@phosphor-icons/react"
import { CollaboratorsContainer, CollaboratorsItens, CollaboratorItem, CollaboratorImage } from "./styles"
import { SocialLinks } from "@components/SocialLinks";

interface CollaboratorsProps extends React.HTMLAttributes<HTMLDivElement> {
  collaborators: { 
    id: number; 
    name: string, 
    image: string, 
    socials: {
      linkedin?: string;
      facebook?: string;
      instagram?: string;
      github?: string;
      x?: string;
    }, 
  }[];
}

export function Collaborators({ collaborators, ...props }: CollaboratorsProps) {
  return (<>
    <CollaboratorsContainer {...props}>
      <h2>Collaborators</h2>
      <CollaboratorsItens>
        {collaborators.map((collaborator) => (
          <CollaboratorItem key={collaborator.id}>
            {collaborator.image 
              ? <CollaboratorImage src={collaborator.image} alt={collaborator.name} /> 
              : <CircleWavyCheck size={24} weight="fill" />} 
            <span>{collaborator.name}</span>
            <SocialLinks socials={collaborator.socials} name={collaborator.name} />
          </CollaboratorItem>
        ))}
      </CollaboratorsItens>
    </CollaboratorsContainer>
  </>
  )
}

