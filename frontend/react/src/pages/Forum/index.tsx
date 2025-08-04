"use client"

import { NavLink, useSearchParams } from "react-router-dom"
import { SearchInput } from "../../components/SearchInput"
import {
  Button,
  ForumContainer,
  ForumList,
  Header,
  PageSizeSelector,
  PaginationContainer,
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
import { LoadingSpinner } from "@components/LoadingSpinner"
import { Question as QuestionType } from "@app-types/question"

export function Forum() {
  return (
    <ContractProvider>
      <ForumContent />
    </ContractProvider>
  )
}

function ForumContent() {
  const { name } = useParams<{ name: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const forumName = name || ""
  const [pageSize, setPageSize] = useState(Number(searchParams.get("page_size")) || 10)

  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([])
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)


  const {
    fetchQuestions,
    questionsLoading,
    questionsError,
    contractReady,
  } = useContract();

  // Load questions function
  const loadInitialQuestions = async () => {
    if (!forumName || !contractReady) return;

    const { questions: fetchedQuestions, totalQuestions: total, hasNextPage: hasNext } = await fetchQuestions(forumName, 1, pageSize);

    setQuestions(fetchedQuestions);
    setFilteredQuestions(fetchedQuestions);
    setTotalQuestions(total);
    setHasNextPage(hasNext);
    setCurrentPage(1);
  };

  // Load initial questions
  useEffect(() => {
    loadInitialQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractReady, forumName, pageSize]);

  // Load more questions (pagination)
  const handleLoadMore = async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { questions: newQuestions, hasNextPage: hasNext } = await fetchQuestions(forumName, nextPage, pageSize);

      const updatedQuestions = [...questions, ...newQuestions];
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
      setHasNextPage(hasNext);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more questions:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredQuestions(questions)
      return
    }

    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredQuestions(filtered)
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value)
    setPageSize(newPageSize)
    setSearchParams({ page_size: newPageSize.toString() })
    setCurrentPage(1)
    loadInitialQuestions()
  }

  // Loading state
  if (!contractReady || questionsLoading) {
    return (
      <ForumContainer>
        <LoadingSpinner message={
          !contractReady ? "Initializing contract..." :
            "Loading questions..."
        } />
      </ForumContainer>
    )
  }

  // Error state
  if (questionsError) {
    return (
      <ForumContainer>
        <Header>
          <h2>Forum: {forumName}</h2>
        </Header>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Error loading questions: {questionsError}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "10px", padding: "8px 16px" }}
          >
            Retry
          </button>
        </div>
      </ForumContainer>
    )
  }

  // Empty state
  if (questions.length === 0) {
    return (
      <ForumContainer>
        <Header>
          <SearchInput onSearch={handleSearch} />
          <NavLink to={`/forum/${forumName}/question`}>
            <Button>New Question</Button>
          </NavLink>
        </Header>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <Question size={48} color="#666" />
          <h3 style={{ margin: "16px 0 8px", color: "#666" }}>No questions yet</h3>
          <p style={{ color: "#888", marginBottom: "20px" }}>Be the first to ask a question in this forum!</p>
          <NavLink to={`/forum/${forumName}/question`}>
            <Button>Ask First Question</Button>
          </NavLink>
        </div>
      </ForumContainer>
    )
  }

  return (
    <ForumContainer>
      <Header>
        <SearchInput onSearch={handleSearch} />
        <NavLink to={`/forum/${forumName}/question`}>
          <Button>New Question</Button>
        </NavLink>
      </Header>

      <PaginationContainer>
        <p>Page size:</p>
        <PageSizeSelector value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </PageSizeSelector>
        <p style={{ flex: 1, textAlign: "right" }}>Showing {filteredQuestions.length} of {totalQuestions} questions</p>
      </PaginationContainer>

      <ForumList>
        {filteredQuestions.map((question) => (
          <NavLink key={question.id} to={`/forum/${forumName}/question/${question.id}`}>
            <TopicCard>
              <TopicInfo>
                <TopicAvatar
                  src={question.authorAvatar}
                  alt={question.authorName}
                />
                <div>
                  <TopicTitle>
                    {question.isOpen ? (
                      <Question size={18} color="#d4821e" weight="fill" />
                    ) : (
                      <CheckCircle size={18} color="#2e8b57" weight="fill" />
                    )}
                    <h3>{question.title}</h3>
                  </TopicTitle>
                  <TopicMeta>
                    {question.authorName} ({question.authorAddress.slice(0, 6)}...{question.authorAddress.slice(-4)})
                    <time>{question.timestamp}</time>
                  </TopicMeta>
                  {question.tags.length > 0 && (
                    <div style={{ marginTop: "8px" }}>
                      {question.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: "inline-block",
                            backgroundColor: "#e5e7eb",
                            color: "#374151",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            marginRight: "4px"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </TopicInfo>
              <TopicFooter>
                <CurrencyDollar size={24} color="#25c028" weight="fill" />
                <span>{question.stakeAmount.toFixed(2)}</span>
              </TopicFooter>
            </TopicCard>
          </NavLink>
        ))}
      </ForumList>

      {/* Load More Button */}
      {hasNextPage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            style={{
              padding: "12px 24px",
              opacity: isLoadingMore ? 0.7 : 1,
              cursor: isLoadingMore ? "not-allowed" : "pointer"
            }}
          >
            {isLoadingMore ? "Loading..." : "Load More Questions"}
          </Button>
        </div>
      )}
    </ForumContainer>
  )
}