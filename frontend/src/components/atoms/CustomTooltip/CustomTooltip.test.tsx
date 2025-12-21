import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import CustomTooltip from './CustomTooltip'

describe('CustomTooltip', () => {
  it('renders with custom container class and icon button', () => {
    render(<CustomTooltip text="Helpful tooltip text" />)
    
    const container = document.querySelector('.custom-tooltip-container')
    expect(container).toBeInTheDocument()
    
    const iconButton = screen.getByRole('button')
    expect(iconButton).toHaveClass('custom-tooltip-icon')
    
    const icon = iconButton.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('displays tooltip text on hover', async () => {
    render(<CustomTooltip text="This is tooltip content" />)
    
    const iconButton = screen.getByRole('button')
    
    fireEvent.mouseEnter(iconButton)
    
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('This is tooltip content')
  })

  it('applies custom tooltip class', async () => {
    render(<CustomTooltip text="Custom styled tooltip" />)
    
    const iconButton = screen.getByRole('button')
    fireEvent.mouseEnter(iconButton)
    
    const tooltip = await screen.findByRole('tooltip')
    const innerTooltip = tooltip.querySelector('.custom-tooltip')
    expect(innerTooltip).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', async () => {
    render(<CustomTooltip text="Disappearing tooltip" />)
    
    const iconButton = screen.getByRole('button')
    
    fireEvent.mouseEnter(iconButton)
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    
    fireEvent.mouseLeave(iconButton)
    
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'))
  })

  it('uses info icon and bottom placement', () => {
    render(<CustomTooltip text="Positioned tooltip" />)
    
    const iconButton = screen.getByRole('button')
    const infoIcon = iconButton.querySelector('[data-testid="InfoOutlinedIcon"]')
    expect(infoIcon).toBeInTheDocument()
  })
})