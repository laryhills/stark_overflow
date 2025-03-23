import { CircleWavyCheck } from "@phosphor-icons/react"
import { SponsorsContainer, SponsorItem, SponsorsItens } from "./styles"

export function Sponsors() {
  // In a real app, you'd have actual sponsor data and logos
  const sponsors = [
    { id: 1, name: "Sponsor 1" },
    { id: 2, name: "Sponsor 2" },
    { id: 3, name: "Sponsor 3" },
    { id: 4, name: "Sponsor 4" },
    { id: 5, name: "Sponsor 5" },
    { id: 6, name: "Sponsor 6" },
  ]

  return (<>
    <SponsorsContainer>
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

