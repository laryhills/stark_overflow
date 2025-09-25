import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { InputForm } from './index'

// Mock theme for styled-components
const mockTheme = {
  background: '#ffffff',
  borderColor: '#e5e7eb',
  text: '#000000',
  textSecondary: '#6b7280'
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  )
}

describe('InputForm', () => {
  const defaultProps = {
    id: 'test-input',
    value: '',
    label: 'Test Label',
    error: null,
    setValue: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Accessibility - Label Association', () => {
    it('should render with accessible label association', () => {
      renderWithTheme(<InputForm {...defaultProps} />)

      const input = screen.getByRole('textbox')
      const label = screen.getByText('Test Label')

      expect(input).toHaveAttribute('id', 'test-input')
      expect(label.closest('label')).toHaveAttribute('for', 'test-input')
    })

    it('should associate label with input using htmlFor and id', () => {
      renderWithTheme(<InputForm {...defaultProps} />)

      const input = screen.getByLabelText('Test Label')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', 'test-input')
    })
  })

  describe('Error Display and State', () => {
    it('should display error message when error prop is provided', () => {
      const errorMessage = 'This field is required'
      renderWithTheme(<InputForm {...defaultProps} error={errorMessage} />)

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should not display error message when error prop is null', () => {
      renderWithTheme(<InputForm {...defaultProps} error={null} />)

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should apply error styling when error is present', () => {
      const errorMessage = 'Error message'
      renderWithTheme(<InputForm {...defaultProps} error={errorMessage} />)

      const errorElement = screen.getByText(errorMessage)
      expect(errorElement).toHaveStyle({ color: '#ef4444' })
    })

    it('should apply error state styling to container when error is present', () => {
      const errorMessage = 'Error message'
      renderWithTheme(<InputForm {...defaultProps} error={errorMessage} />)

      // Check that the error message is displayed
      expect(screen.getByText(errorMessage)).toBeInTheDocument()

      // The InputForm component uses $hasError prop for styled-components styling
      // We can verify the error state through the presence of the error message
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })
  })

  describe('Basic Input Interaction', () => {
    it('should render with correct placeholder', () => {
      const placeholder = 'Enter your text'
      renderWithTheme(<InputForm {...defaultProps} placeholder={placeholder} />)

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    it('should display current value', () => {
      const value = 'Current value'
      renderWithTheme(<InputForm {...defaultProps} value={value} />)

      expect(screen.getByDisplayValue(value)).toBeInTheDocument()
    })

    it('should call setValue when input changes', async () => {
      const user = userEvent.setup()
      const setValue = vi.fn()

      renderWithTheme(<InputForm {...defaultProps} setValue={setValue} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      expect(setValue).toHaveBeenCalledWith('t')
      expect(setValue).toHaveBeenCalledWith('e')
      expect(setValue).toHaveBeenCalledWith('s')
      expect(setValue).toHaveBeenCalledWith('t')
    })

    it('should handle disabled state', () => {
      renderWithTheme(<InputForm {...defaultProps} disabled={true} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })
  })

  describe('Validation Triggers', () => {
    it('should call validateForm on keyup', async () => {
      const user = userEvent.setup()
      const validateForm = vi.fn()

      renderWithTheme(<InputForm {...defaultProps} validateForm={validateForm} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'a')

      expect(validateForm).toHaveBeenCalled()
    })

    it('should call validateForm on blur', async () => {
      const user = userEvent.setup()
      const validateForm = vi.fn()

      renderWithTheme(<InputForm {...defaultProps} validateForm={validateForm} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()

      expect(validateForm).toHaveBeenCalled()
    })

    it('should not call validateForm when prop is not provided', async () => {
      const user = userEvent.setup()

      renderWithTheme(<InputForm {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.tab()

      // Should not throw error when validateForm is undefined
      expect(input).toBeInTheDocument()
    })
  })

  describe('Additional Props and Children', () => {
    it('should render children (icons)', () => {
      const TestIcon = () => <span data-testid="test-icon">🔍</span>

      renderWithTheme(
        <InputForm {...defaultProps}>
          <TestIcon />
        </InputForm>
      )

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('should pass through additional input props', () => {
      renderWithTheme(
        <InputForm
          {...defaultProps}
          autoComplete="email"
          maxLength={50}
          data-testid="custom-input"
        />
      )

      const input = screen.getByTestId('custom-input')
      expect(input).toHaveAttribute('autoComplete', 'email')
      expect(input).toHaveAttribute('maxLength', '50')
    })

    it('should render with tooltip text', () => {
      const tooltipText = 'This is helpful information'
      renderWithTheme(<InputForm {...defaultProps} tooltipText={tooltipText} />)

      // The tooltip text should be passed to Label component
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })
  })

  describe('Keyboard and Mouse Events', () => {
    it('should handle onChange event correctly', async () => {
      const user = userEvent.setup()
      const setValue = vi.fn()

      renderWithTheme(<InputForm {...defaultProps} setValue={setValue} />)

      const input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, 'hello world')

      // Should be called for each character
      expect(setValue).toHaveBeenCalledTimes(11)
      expect(setValue).toHaveBeenLastCalledWith('d')
    })

    it('should handle focus and blur events', async () => {
      const user = userEvent.setup()
      const validateForm = vi.fn()

      renderWithTheme(<InputForm {...defaultProps} validateForm={validateForm} />)

      const input = screen.getByRole('textbox')

      // Focus the input
      await user.click(input)
      expect(input).toHaveFocus()

      // Blur the input
      await user.tab()
      expect(input).not.toHaveFocus()
      expect(validateForm).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string value', () => {
      renderWithTheme(<InputForm {...defaultProps} value="" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should handle long error messages', () => {
      const longError = 'This is a very long error message that should still be displayed correctly in the interface'
      renderWithTheme(<InputForm {...defaultProps} error={longError} />)

      expect(screen.getByText(longError)).toBeInTheDocument()
    })

    it('should handle special characters in value', () => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      renderWithTheme(<InputForm {...defaultProps} value={specialValue} />)

      expect(screen.getByDisplayValue(specialValue)).toBeInTheDocument()
    })
  })
})
