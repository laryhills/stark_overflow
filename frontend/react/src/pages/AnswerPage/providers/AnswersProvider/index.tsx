import { useState, useEffect } from "react";

import { AnswersContext } from "./answersContext";
import { Answer } from "pages/AnswerPage/types";
import { useContract } from "@hooks/useContract";

interface AnswersProviderProps {
  children: React.ReactNode;
  questionId: string;
}

export function AnswersProvider({ children, questionId }: AnswersProviderProps) {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const { fetchAnswers, answersLoading, answersError } = useContract()

  // Fetch answers when questionId changes
  useEffect(() => {
    if (questionId) {
      const loadAnswers = async () => {
        setIsLoading(true)
        console.log("fetching answers", questionId, "___")
        const contractAnswers = await fetchAnswers(questionId)
        setAnswers(contractAnswers)
        setIsLoading(false)
      }
      
      loadAnswers()
    }
  }, [questionId])

  // Update loading state when contract is fetching
  useEffect(() => {
    setIsLoading(answersLoading)
  }, [answersLoading])

  // Log errors (could also set status message here)
  useEffect(() => {
    if (answersError) {
      console.error("Error fetching answers:", answersError)
    }
  }, [answersError])

  return (
    <AnswersContext.Provider
      value={{
        answers,
        setAnswers,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AnswersContext.Provider>
  )
}