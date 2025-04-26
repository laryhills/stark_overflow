"use client"

import type React from "react"
import { useState, useRef } from "react"
import { PaperPlaneRight, Link as LinkIcon, Tag, CurrencyDollar, Info, X, Image, FileArrowUp } from "phosphor-react"
import {
  Container,
  Form,
  TitleInput,
  EditorContainer,
  RepositoryInput,
  TagsInput,
  Button,
  AmountInput,
  ErrorMessage,
  ToolbarButton,
  EditorToolbar,
  PreviewContainer,
  TabContainer,
  Tab,
  FileUploadArea,
  UploadedFilePreview,
  UploadedImage,
  RemoveFileButton,
  FormGroup,
  Label,
  Tooltip,
  TooltipText,
  ValidationIndicator,
  TransactionStatus,
  UploadProgress,
} from "./style"
import { NavLink, useNavigate } from "react-router-dom"
import { uploadFile, deleteFile, type UploadedFile } from "../../services/file-upload"
import { useAccount } from "@starknet-react/core"
import { useWallet } from "../../providers/wallet-connect-context"

// Import dynamic components for markdown rendering
const ReactMarkdown = await import("react-markdown").then((mod) => mod.default || mod)
const remarkGfm = await import("remark-gfm").then((mod) => mod.default || mod)

// Define proper types for the code component props
interface CodeProps {
  className?: string
  inline?: boolean
  children?: React.ReactNode
}

// Define proper types for the image component props
interface ImageProps {
  src?: string
  alt?: string
}

// Custom code component for syntax highlighting
const CodeBlock: React.FC<CodeProps> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  if (!inline && match) {
    return (
      <div className="code-block">
        <div className="code-header">
          <span>{language}</span>
        </div>
        <pre className={className} {...props}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export function NewQuestion() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [repository, setRepository] = useState("")
  const [tags, setTags] = useState("")
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [transactionStatus, setTransactionStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()
  const { isConnected } = useAccount()
  const { openConnectModal } = useWallet()

  // Create a map of image URLs to their blob URLs for the preview
  const [imageMap, setImageMap] = useState<Record<string, string>>({})

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    } else if (title.length < 10) {
      newErrors.title = "Title should be at least 10 characters"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    } else if (description.length < 30) {
      newErrors.description = "Description should be at least 30 characters"
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Check if it's an image
      if (file.type.startsWith("image/")) {
        setIsUploading(true)
        setUploadProgress(0)

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            const newProgress = prev + Math.random() * 20
            return newProgress >= 90 ? 90 : newProgress
          })
        }, 200)

        try {
          // Upload the file
          const uploadedFile = await uploadFile(file)

          // Clear the interval and set progress to 100%
          clearInterval(progressInterval)
          setUploadProgress(100)

          // Add to uploaded files
          setUploadedFiles((prev) => [...prev, uploadedFile])

          // Add image markdown to description
          const imageMarkdown = `![${file.name}](${uploadedFile.url})\n`
          setDescription((prev) => prev + imageMarkdown)

          // Update the image map for preview
          setImageMap((prev) => ({
            ...prev,
            [uploadedFile.url]: uploadedFile.url,
          }))

          // Reset upload state after a delay
          setTimeout(() => {
            setIsUploading(false)
            setUploadProgress(0)
          }, 500)
        } catch (error) {
          console.error("File upload failed:", error)
          clearInterval(progressInterval)
          setIsUploading(false)
          setUploadProgress(0)
        }
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Remove uploaded file
  const handleRemoveFile = async (file: UploadedFile, e: React.MouseEvent) => {
    // Prevent event propagation to avoid form submission
    e.preventDefault()
    e.stopPropagation()

    try {
      // Delete the file
      await deleteFile(file.id)

      // Remove from state
      setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id))

      // Remove from description
      const imageMarkdown = `![${file.name}](${file.url})`
      setDescription((prev) => prev.replace(imageMarkdown, ""))

      // Remove from image map
      const newImageMap = { ...imageMap }
      delete newImageMap[file.url]
      setImageMap(newImageMap)
    } catch (error) {
      console.error("File deletion failed:", error)
    }
  }

  // Handle markdown toolbar actions
  const insertMarkdown = (markdownSyntax: string, placeholder = "") => {
    if (!textAreaRef.current) return

    const textarea = textAreaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = description.substring(start, end)

    let newText = ""
    if (selectedText) {
      // If text is selected, wrap it with markdown syntax
      newText =
        description.substring(0, start) + markdownSyntax.replace(placeholder, selectedText) + description.substring(end)
    } else {
      // If no text is selected, just insert the markdown syntax with placeholder
      newText = description.substring(0, start) + markdownSyntax + description.substring(end)
    }

    setDescription(newText)

    // Focus back on textarea and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + markdownSyntax.indexOf(placeholder) + (selectedText ? selectedText.length : 0)
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Handle tab switching
  const handleTabChange = (tab: "write" | "preview") => {
    setActiveTab(tab)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!isConnected) {
      openConnectModal()
      return
    }

    try {
      setTransactionStatus("processing")

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success
      setTransactionStatus("success")

      // Redirect after successful submission
      setTimeout(() => {
        navigate("/forum/reactjs")
      }, 1500)
    } catch (error) {
      console.error("Transaction error:", error)
      setTransactionStatus("error")
    }
  }

  // Custom image renderer that uses our image map
  const ImageRenderer = ({ src, alt }: ImageProps) => {
    if (!src) return null

    // Use the actual blob URL from our map
    return <img src={src || "/placeholder.svg"} alt={alt || ""} style={{ maxWidth: "100%" }} />
  }

  return (
    <Container>
      <h2>Create Question</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">
            Title
            <Tooltip>
              <Info size={16} />
              <TooltipText>Be specific and imagine you're asking a question to another person</TooltipText>
            </Tooltip>
            <ValidationIndicator valid={!errors.title && title.length > 0} />
          </Label>
          <TitleInput
            id="title"
            type="text"
            placeholder="e.g. How to implement a custom hook in React?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => validateForm()}
            hasError={!!errors.title}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">
            Description
            <Tooltip>
              <Info size={16} />
              <TooltipText>Include all the information someone would need to answer your question</TooltipText>
            </Tooltip>
            <ValidationIndicator valid={!errors.description && description.length > 0} />
          </Label>

          <TabContainer>
            <Tab type="button" active={activeTab === "write"} onClick={() => handleTabChange("write")}>
              Write
            </Tab>
            <Tab type="button" active={activeTab === "preview"} onClick={() => handleTabChange("preview")}>
              Preview
            </Tab>
          </TabContainer>

          {activeTab === "write" ? (
            <>
              <EditorToolbar>
                <ToolbarButton
                  type="button"
                  title="Bold"
                  onClick={() => insertMarkdown("**placeholder**", "placeholder")}
                >
                  B
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="Italic"
                  onClick={() => insertMarkdown("*placeholder*", "placeholder")}
                >
                  I
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="Heading"
                  onClick={() => insertMarkdown("## placeholder", "placeholder")}
                >
                  H
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="Code"
                  onClick={() => insertMarkdown("```\nplaceholder\n```", "placeholder")}
                >
                  {"</>"}
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="Link"
                  onClick={() => insertMarkdown("[placeholder](url)", "placeholder")}
                >
                  <LinkIcon size={16} />
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="List"
                  onClick={() => insertMarkdown("- placeholder", "placeholder")}
                >
                  • •
                </ToolbarButton>
                <ToolbarButton
                  type="button"
                  title="Upload Image"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Image size={16} />
                </ToolbarButton>
              </EditorToolbar>

              <EditorContainer
                ref={textAreaRef}
                placeholder="Describe your issue in detail. You can use markdown for formatting."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => validateForm()}
                hasError={!!errors.description}
              />

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUpload}
              />

              {isUploading ? (
                <UploadProgress value={uploadProgress}>
                  <div style={{ width: `${uploadProgress}%` }}></div>
                  <span>{Math.round(uploadProgress)}% Uploading...</span>
                </UploadProgress>
              ) : uploadedFiles.length === 0 ? (
                <FileUploadArea onClick={() => fileInputRef.current?.click()}>
                  <FileArrowUp size={24} />
                  <p>Click to upload images or drag and drop</p>
                </FileUploadArea>
              ) : (
                <UploadedFilePreview>
                  {uploadedFiles.map((file) => (
                    <div key={file.id}>
                      <UploadedImage src={file.url} alt={file.name} />
                      <RemoveFileButton onClick={(e) => handleRemoveFile(file, e)}>
                        <X size={16} />
                      </RemoveFileButton>
                    </div>
                  ))}
                </UploadedFilePreview>
              )}
            </>
          ) : (
            <PreviewContainer>
              {description ? (
                <div className="markdown-preview">
                  {/* Render uploaded images directly for preview */}
                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-images-preview">
                      {uploadedFiles.map((file) => (
                        <img
                          key={file.id}
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          style={{ maxWidth: "100%", marginBottom: "1rem" }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Render markdown content */}
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: CodeBlock,
                      img: ImageRenderer,
                    }}
                  >
                    {description}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="empty-preview">Your preview will appear here...</p>
              )}
            </PreviewContainer>
          )}

          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="amount">
            Amount to Stake
            <Tooltip>
              <Info size={16} />
              <TooltipText>The amount you're willing to pay for a solution</TooltipText>
            </Tooltip>
            <ValidationIndicator valid={!errors.amount && amount.length > 0} />
          </Label>
          <AmountInput hasError={!!errors.amount}>
            <CurrencyDollar size={20} />
            <input
              id="amount"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => validateForm()}
            />
          </AmountInput>
          {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="repository">
            Repository Link (Optional)
            <Tooltip>
              <Info size={16} />
              <TooltipText>Link to a GitHub repository or code sample</TooltipText>
            </Tooltip>
          </Label>
          <RepositoryInput>
            <LinkIcon size={20} />
            <input
              id="repository"
              type="text"
              placeholder="https://github.com/username/repo"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
            />
          </RepositoryInput>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">
            Tags (Optional)
            <Tooltip>
              <Info size={16} />
              <TooltipText>Add up to 5 tags to describe what your question is about</TooltipText>
            </Tooltip>
          </Label>
          <TagsInput>
            <Tag size={20} />
            <input
              id="tags"
              type="text"
              placeholder="e.g. react hooks typescript"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </TagsInput>
        </FormGroup>

        <div className="buttons">
          <NavLink to="/forum/reactjs">
            <Button variant="cancel" type="button">
              Discard
            </Button>
          </NavLink>
          <Button variant="publish" type="submit" disabled={transactionStatus === "processing"}>
            {transactionStatus === "processing" ? "Publishing..." : "Publish"}
            {transactionStatus !== "processing" && <PaperPlaneRight size={20} />}
          </Button>
        </div>

        {transactionStatus !== "idle" && (
          <TransactionStatus status={transactionStatus}>
            {transactionStatus === "processing" && "Processing transaction..."}
            {transactionStatus === "success" && "Question published successfully!"}
            {transactionStatus === "error" && "Transaction failed. Please try again."}
          </TransactionStatus>
        )}
      </Form>
    </Container>
  )
}
