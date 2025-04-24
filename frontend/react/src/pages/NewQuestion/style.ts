import styled, { css, keyframes } from "styled-components"

export const Container = styled.div`
  background: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  margin: 24px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 24px;
    font-size: 1.5rem;
  }

  @media (max-width: 850px) {
    width: 90%;
    padding: 16px;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
`

export const Tooltip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: help;
  color: ${(props) => props.theme.textSecondary};

  &:hover > div {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`

export const TooltipText = styled.div`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  width: 200px;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  transform: translateY(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: normal;
  font-size: 0.8rem;
  border: 1px solid ${(props) => props.theme.borderColor};

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.borderColor} transparent transparent transparent;
  }
`

export const ValidationIndicator = styled.span<{ valid: boolean }>`
  margin-left: auto;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.valid ? "#10b981" : "transparent")};
  transition: background-color 0.3s;
  
  ${(props) =>
    props.valid &&
    css`
    &::after {
      content: '✓';
      color: white;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `}
`

interface InputProps {
  hasError?: boolean
}

export const TitleInput = styled.input<InputProps>`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : props.theme.borderColor)};
  border-radius: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#7c3aed")};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? "rgba(239, 68, 68, 0.2)" : "rgba(124, 58, 237, 0.2)")};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.7;
  }
`

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 8px;
`

export const Tab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "#7c3aed" : "transparent")};
  color: ${(props) => (props.active ? props.theme.text : props.theme.textSecondary)};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`

export const EditorToolbar = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

export const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.borderColor};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const EditorContainer = styled.textarea<InputProps>`
  padding: 12px;
  font-size: 1rem;
  min-height: 200px;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : props.theme.borderColor)};
  border-radius: 0 0 6px 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  resize: vertical;
  font-family: monospace;
  line-height: 1.5;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#7c3aed")};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? "rgba(239, 68, 68, 0.2)" : "rgba(124, 58, 237, 0.2)")};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.7;
  }
`

export const PreviewContainer = styled.div`
  padding: 12px;
  min-height: 200px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  overflow-y: auto;
  line-height: 1.6;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1em;
  }

  ul, ol {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  blockquote {
    border-left: 4px solid ${(props) => props.theme.borderColor};
    padding-left: 1em;
    margin-left: 0;
    color: ${(props) => props.theme.textSecondary};
  }

  code {
    background: ${(props) => props.theme.borderColor};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  pre {
    margin-bottom: 1em;
    overflow-x: auto;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  a {
    color: #7c3aed;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .code-block {
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .code-header {
    background: ${(props) => props.theme.borderColor};
    padding: 0.5rem 1rem;
    font-family: monospace;
    font-size: 0.8rem;
    color: ${(props) => props.theme.textSecondary};
  }

  .empty-preview {
    color: ${(props) => props.theme.textSecondary};
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

export const FileUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed ${(props) => props.theme.borderColor};
  border-radius: 6px;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.background};
    border-color: #7c3aed;
  }

  p {
    margin-top: 8px;
    color: ${(props) => props.theme.textSecondary};
    font-size: 0.9rem;
  }
`

export const UploadedFilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;

  > div {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
  }
`

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const RemoveFileButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`

export const UploadProgress = styled.div<{ value: number }>`
  width: 100%;
  height: 4px;
  background: ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-top: 12px;
  position: relative;
  overflow: hidden;

  > div {
    position: absolute;
    height: 100%;
    background: #7c3aed;
    border-radius: 4px;
    transition: width 0.3s ease-out;
  }

  > span {
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    color: ${(props) => props.theme.textSecondary};
  }
`

export const AmountInput = styled.div<InputProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : props.theme.borderColor)};
  border-radius: 6px;
  background: ${(props) => props.theme.background};
  transition: border-color 0.3s;

  &:focus-within {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#7c3aed")};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? "rgba(239, 68, 68, 0.2)" : "rgba(124, 58, 237, 0.2)")};
  }

  svg {
    color: #7c3aed;
  }

  input {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.text};
    outline: none;
    width: 100%;
    font-size: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.textSecondary};
      opacity: 0.7;
    }
  }
`

export const RepositoryInput = styled(AmountInput)`
  svg {
    color: #7c3aed;
  }
`

export const TagsInput = styled(AmountInput)`
  svg {
    color: #7c3aed;
  }
`

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: -4px;
`

export const Button = styled.button<{ variant: "cancel" | "publish" }>`
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  
  ${({ variant, theme }) =>
    variant === "publish"
      ? css`
          background: #7c3aed;
          color: white;
          
          &:hover:not(:disabled) {
            background: #6d28d9;
          }
          
          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `
      : css`
          background: ${theme.borderColor};
          color: ${theme.text};
          
          &:hover {
            background: ${theme.textSecondary};
            color: ${theme.background};
          }
        `}
`

const statusAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const TransactionStatus = styled.div<{ status: "idle" | "processing" | "success" | "error" }>`
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
  animation: ${statusAnimation} 0.3s ease-out;
  
  ${({ status }) => {
    switch (status) {
      case "processing":
        return css`
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        `
      case "success":
        return css`
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        `
      case "error":
        return css`
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        `
      default:
        return ""
    }
  }}
`
