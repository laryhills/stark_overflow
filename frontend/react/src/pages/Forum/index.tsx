"use client"

import { NavLink } from "react-router-dom"
import { SearchInput } from "../../components/SearchInput"
import {
  Button,
  ForumContainer,
  ForumList,
  Header,
  TopicAvatar,
  TopicCard,
  TopicFooter,
  TopicInfo,
  TopicMeta,
  TopicTitle,
} from "./style"
import { CheckCircle, CurrencyDollar, Question } from "phosphor-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContract } from "@hooks/useContract"
import { ContractProvider } from "@hooks/useContract/contract.provider"


interface Topic {
  id: string
  avatar: string
  title: string
  author: string
  time: string
  amount: string
  state: string
  stakeLoading?: boolean
}

export function Forum() {
  return (
    <ContractProvider>
      <ForumContent />
    </ContractProvider>
  )
}

function ForumContent() {
  const { name } = useParams<{ name: string }>()
  const { getTotalStakedOnQuestion, contractReady } = useContract()


  const initialTopics: Topic[] = [
    {
      id: "1",
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "Unit tests in components that use Design System",
      author: "Maicon Domingues",
      time: "today at 11:47",
      amount: "0",
      state: "open",
      stakeLoading: true
    },
    {
      id: "2",
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "[Tip] Carousel with Keen-Slider",
      author: "Jordane Chaves Ferreira Rocha",
      time: "yesterday at 22:15",
      amount: "0",
      state: "closed",
      stakeLoading: true
    },
    {
      id: "3",
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "Tests with Jest and React Testing Library",
      author: "Vitor Antonio Danner da Silva",
      time: "yesterday at 19:07",
      amount: "0",
      state: "open",
      stakeLoading: true
    },
    {
      id: "4",
      avatar: "https://avatars.githubusercontent.com/u/62848833?v=4",
      title: "I'm facing problems on Github",
      author: "Jhane Doe",
      time: "yesterday at 16:24",
      amount: "0",
      state: "open",
      stakeLoading: true
    },
  ]

  const [topics, setTopics] = useState<Topic[]>([])

  // Fetch stake amounts for all topics (only once on mount)
  useEffect(() => {
    if (!contractReady) return

    const fetchStakeAmounts = async () => {
      const updatedTopics = await Promise.all(
        initialTopics.map(async (topic) => {
          try {
            const stakeAmount = await getTotalStakedOnQuestion(Number(topic.id))

            return {
              ...topic,
              amount: stakeAmount,
              stakeLoading: false
            }
          } catch (error) {
            console.error(`Error fetching stake for question ${topic.id}:`, error)
            return {
              ...topic,
              amount: "0",
              stakeLoading: false
            }
          }
        })
      )

      setTopics(updatedTopics)
    }

    fetchStakeAmounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTotalStakedOnQuestion, contractReady])

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      setTopics(initialTopics)
      return
    }

    const filteredTopics = initialTopics.filter((topic) => topic.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setTopics(filteredTopics)
  }

  if (!contractReady) {
    return (
      <ForumContainer>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Loading forum...</p>
        </div>
      </ForumContainer>
    )
  }

  return (
    <ForumContainer>
      <Header>
        <SearchInput onSearch={handleSearch} />
        <NavLink to={`/forum/${name}/question`}>
          <Button>New Question</Button>
        </NavLink>
      </Header>
      <ForumList>
        {topics.map((topic) => (
          <NavLink key={topic.id} to={`/forum/${name}/question/${topic.id}`}>
            <TopicCard>
              <TopicInfo>
                <TopicAvatar src={topic.avatar} alt={topic.author} />
                <div>
                  <TopicTitle>
                    {topic.state === "open" ? (
                      <Question size={18} color="#d4821e" weight="fill" />
                    ) : (
                      <CheckCircle size={18} color="#2e8b57" weight="fill" />
                    )}
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
                <span>{Number(topic.amount).toFixed(2)}</span>
              </TopicFooter>
            </TopicCard>
          </NavLink>
        ))}
      </ForumList>
    </ForumContainer>
  )
}
