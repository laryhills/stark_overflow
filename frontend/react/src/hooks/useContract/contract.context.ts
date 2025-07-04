import { createContext } from 'react'
import { StarknetTypedContract } from "@starknet-react/core"
import { Question, Answer, StarkOverflowABI } from '@app-types/index'

interface ContractContextType {
  contract: StarknetTypedContract<typeof StarkOverflowABI> | undefined
  contractReady: boolean
  isConnected: boolean | undefined
  address: string | undefined
  questionLoading: boolean
  answersLoading: boolean
  questionError: string | null
  answersError: string | null
  markCorrectLoading: boolean
  markCorrectError: string | null
  fetchQuestion: (questionId: number) => Promise<Question | null>
  fetchAnswers: (questionId: number) => Promise<Answer[]>
  clearQuestionError: () => void
  clearAnswersError: () => void
  markAnswerAsCorrect: (questionId: string, answerId: string) => Promise<boolean>
  getCorrectAnswer: (questionId: string) => Promise<string | null>
}

export const ContractContext = createContext<ContractContextType | undefined>(undefined)