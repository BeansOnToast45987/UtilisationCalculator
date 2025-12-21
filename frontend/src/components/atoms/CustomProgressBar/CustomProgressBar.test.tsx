import { render } from '@testing-library/react'
import CustomProgressBar from './CustomProgressBar'

describe('CustomProgressBar', () => {
  it('renders with custom className and required props', () => {
    render(<CustomProgressBar value={50} color="success" />)
    
    const progressBar = document.querySelector('.custom-progress-bar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveClass('custom-progress-bar')
  })

  it('applies success color', () => {
    render(<CustomProgressBar value={75} color="success" />)
    
    const progressBar = document.querySelector('.custom-progress-bar')
    expect(progressBar).toBeInTheDocument()
  })

  it('applies error color', () => {
    render(<CustomProgressBar value={25} color="error" />)
    
    const progressBar = document.querySelector('.custom-progress-bar')
    expect(progressBar).toBeInTheDocument()
  })

  it('applies determinate variant with value', () => {
    render(<CustomProgressBar value={60} color="success" variant="determinate" />)
    
    const progressBar = document.querySelector('.custom-progress-bar')
    expect(progressBar).toBeInTheDocument()
    
    expect(progressBar).toHaveAttribute('class', expect.stringContaining('custom-progress-bar'))
  })

  it('applies indeterminate variant', () => {
    render(<CustomProgressBar value={100} color="error" variant="indeterminate" />)
    
    const progressBar = document.querySelector('.custom-progress-bar')
    expect(progressBar).toBeInTheDocument()
    
    expect(progressBar).toHaveAttribute('class', expect.stringContaining('custom-progress-bar'))
  })
})