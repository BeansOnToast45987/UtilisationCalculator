import { render, screen, fireEvent } from '@testing-library/react'
import CustomPagination from './CustomPagination'

describe('CustomPagination', () => {
  const defaultProps = {
    count: 10,
    page: 1,
    onChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with required props and custom className', () => {
    render(<CustomPagination {...defaultProps} />)
    
    const pagination = document.querySelector('.custom-pagination')
    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveClass('custom-pagination')
    
    const pageButtons = screen.getAllByRole('button')
    expect(pageButtons.length).toBeGreaterThan(0)
  })

  it('renders with current page selected', () => {
    render(<CustomPagination {...defaultProps} page={3} />)
    
    const currentPageButton = screen.getByRole('button', { name: 'page 3' })
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('handles page change events', () => {
    const onChangeMock = vi.fn()
    render(<CustomPagination {...defaultProps} onChange={onChangeMock} />)
    
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' })
    fireEvent.click(page2Button)
    
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), 2)
  })

  it('shows first and last buttons when enabled', () => {
    render(<CustomPagination {...defaultProps} showFirstButton={true} showLastButton={true} />)
    
    const firstButton = screen.getByRole('button', { name: 'Go to first page' })
    const lastButton = screen.getByRole('button', { name: 'Go to last page' })
    
    expect(firstButton).toBeInTheDocument()
    expect(lastButton).toBeInTheDocument()
  })

  it('does not show first and last buttons by default', () => {
    render(<CustomPagination {...defaultProps} />)
    
    const firstButton = screen.queryByRole('button', { name: 'Go to first page' })
    const lastButton = screen.queryByRole('button', { name: 'Go to last page' })
    
    expect(firstButton).not.toBeInTheDocument()
    expect(lastButton).not.toBeInTheDocument()
  })
})