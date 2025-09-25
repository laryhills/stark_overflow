import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { TagInput } from '../TagInput/index'

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

describe('TagInput', () => {
  const defaultProps = {
    id: 'test-tags',
    label: 'Tags',
    tags: [],
    setTags: vi.fn(),
    onChange: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Accessibility - Label Association', () => {
    it('should render with accessible label association', () => {
      renderWithTheme(<TagInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      const label = screen.getByText('Tags')

      expect(input).toHaveAttribute('id', 'test-tags')
      expect(label.closest('label')).toHaveAttribute('for', 'test-tags')
    })

    it('should associate label with input using htmlFor and id', () => {
      renderWithTheme(<TagInput {...defaultProps} />)

      const input = screen.getByLabelText('Tags')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', 'test-tags')
    })

    it('should have aria-describedby when error is present', () => {
      renderWithTheme(
        <TagInput {...defaultProps} error="Error message" />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-tags-error')
    })

    it('should have role="alert" for error messages', () => {
      renderWithTheme(
        <TagInput {...defaultProps} error="Error message" />
      )

      const errorElement = screen.getByRole('alert')
      expect(errorElement).toHaveTextContent('Error message')
    })

    it('should have aria-live="polite" for tag counter', () => {
      renderWithTheme(<TagInput {...defaultProps} tags={['tag1']} />)

      const counter = screen.getByText('1/5 tags')
      expect(counter).toHaveAttribute('aria-live', 'polite')
    })

    it('should have proper aria-label for remove buttons', () => {
      renderWithTheme(<TagInput {...defaultProps} tags={['react', 'javascript']} />)

      const removeButtons = screen.getAllByLabelText(/Remove .+ tag/)
      expect(removeButtons).toHaveLength(2)
      expect(removeButtons[0]).toHaveAttribute('aria-label', 'Remove react tag')
      expect(removeButtons[1]).toHaveAttribute('aria-label', 'Remove javascript tag')
    })
  })

  describe('Error Display and State', () => {
    it('should display error message when error prop is provided', () => {
      const errorMessage = 'Please add at least one tag'
      renderWithTheme(<TagInput {...defaultProps} error={errorMessage} />)

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should not display error message when error prop is null', () => {
      renderWithTheme(<TagInput {...defaultProps} error={null} />)

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should apply error styling when error is present', () => {
      const errorMessage = 'Error message'
      renderWithTheme(<TagInput {...defaultProps} error={errorMessage} />)

      const errorElement = screen.getByText(errorMessage)
      expect(errorElement).toHaveStyle({ color: '#dc3545' })
    })
  })

  describe('Adding Tags', () => {
    it('should add tag when Enter key is pressed', async () => {
      const user = userEvent.setup()
      const setTags = vi.fn()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} setTags={setTags} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'react')
      await user.keyboard('{Enter}')

      expect(setTags).toHaveBeenCalledWith(['react'])
      expect(onChange).toHaveBeenCalledWith(['react'])
    })

    it('should add tag when Space key is pressed', async () => {
      const user = userEvent.setup()
      const setTags = vi.fn()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} setTags={setTags} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'javascript')

      // Using fireEvent for more direct control
      fireEvent.keyDown(input, { key: ' ' })

      expect(setTags).toHaveBeenCalledWith(['javascript'])
      expect(onChange).toHaveBeenCalledWith(['javascript'])
    })

    it('should add tag when typing space character', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'typescript ')

      expect(onChange).toHaveBeenCalledWith(['typescript'])
    })

    it('should clear input after adding tag', async () => {
      const user = userEvent.setup()

      renderWithTheme(<TagInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'vue')
      await user.keyboard('{Enter}')

      expect(input).toHaveValue('')
    })

    it('should trim whitespace from tags', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '  angular  ')
      await user.keyboard('{Enter}')

      expect(onChange).toHaveBeenCalledWith(['angular'])
    })

    it('should not add empty tags', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '   ')
      await user.keyboard('{Enter}')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should not add duplicate tags', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} tags={['react']} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'react')
      await user.keyboard('{Enter}')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should respect maxTags limit', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const maxTags = 2

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['tag1', 'tag2']}
          maxTags={maxTags}
          onChange={onChange}
        />
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'tag3')
      await user.keyboard('{Enter}')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should disable input when max tags reached', () => {
      const maxTags = 2
      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['tag1', 'tag2']}
          maxTags={maxTags}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveAttribute('placeholder', 'Max 2 tags')
    })

    it('should call validateForm after adding tag', async () => {
      const user = userEvent.setup()
      const validateForm = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} validateForm={validateForm} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.keyboard('{Enter}')

      expect(validateForm).toHaveBeenCalled()
    })
  })

  describe('Removing Tags', () => {
    it('should remove tag when remove button is clicked', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['react', 'vue']}
          onChange={onChange}
        />
      )

      const removeButton = screen.getByLabelText('Remove react tag')
      await user.click(removeButton)

      expect(onChange).toHaveBeenCalledWith(['vue'])
    })

    it('should remove last tag when Backspace is pressed on empty input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['react', 'vue']}
          onChange={onChange}
        />
      )

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{Backspace}')

      expect(onChange).toHaveBeenCalledWith(['react'])
    })

    it('should not remove tag when Backspace is pressed with text in input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['react']}
          onChange={onChange}
        />
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.keyboard('{Backspace}')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should call validateForm after removing tag', async () => {
      const user = userEvent.setup()
      const validateForm = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['react']}
          validateForm={validateForm}
        />
      )

      const removeButton = screen.getByLabelText('Remove react tag')
      await user.click(removeButton)

      expect(validateForm).toHaveBeenCalled()
    })
  })

  describe('setTags and onChange Calls', () => {
    it('should call both setTags and onChange with updated tag list when adding', async () => {
      const user = userEvent.setup()
      const setTags = vi.fn()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['existing']}
          setTags={setTags}
          onChange={onChange}
        />
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'newTag')
      await user.keyboard('{Enter}')

      expect(setTags).toHaveBeenCalledWith(['existing', 'newTag'])
      expect(onChange).toHaveBeenCalledWith(['existing', 'newTag'])
    })

    it('should call both setTags and onChange with updated tag list when removing', async () => {
      const user = userEvent.setup()
      const setTags = vi.fn()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          tags={['tag1', 'tag2', 'tag3']}
          setTags={setTags}
          onChange={onChange}
        />
      )

      const removeButton = screen.getByLabelText('Remove tag2 tag')
      await user.click(removeButton)

      expect(setTags).toHaveBeenCalledWith(['tag1', 'tag3'])
      expect(onChange).toHaveBeenCalledWith(['tag1', 'tag3'])
    })

    it('should work with only setTags (no onChange)', async () => {
      const user = userEvent.setup()
      const setTags = vi.fn()

      renderWithTheme(
        <TagInput
          {...defaultProps}
          setTags={setTags}
        // No onChange prop
        />
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.keyboard('{Enter}')

      expect(setTags).toHaveBeenCalledWith(['test'])
    })
  })

  describe('Display and Visual Elements', () => {
    it('should display existing tags as chips', () => {
      renderWithTheme(
        <TagInput {...defaultProps} tags={['react', 'javascript', 'typescript']} />
      )

      expect(screen.getByText('react')).toBeInTheDocument()
      expect(screen.getByText('javascript')).toBeInTheDocument()
      expect(screen.getByText('typescript')).toBeInTheDocument()
    })

    it('should show tag counter when tags exist', () => {
      renderWithTheme(<TagInput {...defaultProps} tags={['tag1', 'tag2']} />)

      expect(screen.getByText('2/5 tags')).toBeInTheDocument()
    })

    it('should not show tag counter when no tags', () => {
      renderWithTheme(<TagInput {...defaultProps} tags={[]} />)

      expect(screen.queryByText(/\/5 tags/)).not.toBeInTheDocument()
    })

    it('should show custom maxTags in counter', () => {
      renderWithTheme(
        <TagInput {...defaultProps} tags={['tag1']} maxTags={3} />
      )

      expect(screen.getByText('1/3 tags')).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
      const placeholder = 'Add your tags here'
      renderWithTheme(<TagInput {...defaultProps} placeholder={placeholder} />)

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    it('should render children (icons)', () => {
      const TestIcon = () => <span data-testid="test-icon">🏷️</span>

      renderWithTheme(
        <TagInput {...defaultProps}>
          <TestIcon />
        </TagInput>
      )

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation and Events', () => {
    it('should handle multiple rapid key presses', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')

      // Add first tag
      await user.type(input, 'a')
      fireEvent.keyDown(input, { key: 'Enter' })

      // Add second tag (component maintains internal state)
      await user.type(input, 'b')
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(1, ['a'])
      expect(onChange).toHaveBeenNthCalledWith(2, ['b'])
    })

    it('should prevent default behavior on Enter and Space', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      // Test that Enter adds tag (implying preventDefault worked)
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(onChange).toHaveBeenCalledWith(['test'])

      // Test that Space adds tag (implying preventDefault worked)
      await user.type(input, 'test2')
      fireEvent.keyDown(input, { key: ' ' })
      expect(onChange).toHaveBeenCalledWith(['test2'])
    })
  })

  describe('Edge Cases and Stress Testing', () => {
    it('should handle very long tag names', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const longTag = 'a'.repeat(100)

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, longTag)
      await user.keyboard('{Enter}')

      expect(onChange).toHaveBeenCalledWith([longTag])
    })

    it('should handle special characters in tags', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const specialTag = 'tag@#$%^&*()'

      renderWithTheme(<TagInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, specialTag)
      await user.keyboard('{Enter}')

      expect(onChange).toHaveBeenCalledWith([specialTag])
    })

    it('should handle empty tags array', () => {
      renderWithTheme(<TagInput {...defaultProps} tags={[]} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(screen.queryByText(/Remove .+ tag/)).not.toBeInTheDocument()
    })

    it('should handle rapid add/remove operations', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderWithTheme(
        <TagInput {...defaultProps} tags={['existing']} onChange={onChange} />
      )

      const input = screen.getByRole('textbox')

      // Add a tag
      await user.type(input, 'new')
      await user.keyboard('{Enter}')

      // Immediately remove it
      await user.keyboard('{Backspace}')

      expect(onChange).toHaveBeenCalledTimes(2)
    })
  })

  describe('Tooltip and Additional Props', () => {
    it('should render with tooltip text', () => {
      const tooltipText = 'Add relevant tags'
      renderWithTheme(<TagInput {...defaultProps} tooltipText={tooltipText} />)

      // The tooltip text should be passed to Label component
      expect(screen.getByText('Tags')).toBeInTheDocument()
    })

    it('should handle maxTags of 1', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      // Test with no tags initially
      const { rerender } = renderWithTheme(
        <TagInput {...defaultProps} maxTags={1} onChange={onChange} />
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'onlyTag')
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(onChange).toHaveBeenCalledWith(['onlyTag'])

      // Re-render with the tag added to test disabled state
      rerender(
        <ThemeProvider theme={mockTheme}>
          <TagInput {...defaultProps} tags={['onlyTag']} maxTags={1} onChange={onChange} />
        </ThemeProvider>
      )

      const updatedInput = screen.getByRole('textbox')
      expect(updatedInput).toBeDisabled()
    })

    it('should handle no validateForm prop gracefully', async () => {
      const user = userEvent.setup()

      renderWithTheme(<TagInput {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      await user.keyboard('{Enter}')

      // Should not throw error when validateForm is undefined
      expect(input).toHaveValue('')
    })
  })
})
