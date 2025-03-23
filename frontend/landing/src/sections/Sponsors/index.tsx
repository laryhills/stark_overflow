import { CircleWavyCheck } from "@phosphor-icons/react"
import { SponsorsContainer, SponsorItem, SponsorsItens } from "./styles"

interface SponsorsProps extends React.HTMLAttributes<HTMLDivElement> {
  sponsors: { id: number; name: string }[];
}

export function Sponsors({ sponsors, ...props }: SponsorsProps) {
  return (<>
    <SponsorsContainer {...props}>
      <h2>Investors and founders</h2>
      <SponsorsItens>
        {sponsors.map((sponsor) => (
          <SponsorItem key={sponsor.id}>
            <CircleWavyCheck size={24} weight="fill" />
            <span>{sponsor.name}</span>
          </SponsorItem>
        ))}
      </SponsorsItens>
    </SponsorsContainer>
  </>
  )
}

