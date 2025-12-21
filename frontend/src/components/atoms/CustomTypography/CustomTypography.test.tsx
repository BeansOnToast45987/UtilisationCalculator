import { render, screen } from '@testing-library/react'
import CustomTypography from './CustomTypography'

describe('CustomTypography', () => {
  it('renders with custom className and children', () => {
    render(<CustomTypography>Hello World</CustomTypography>)
    
    const typography = document.querySelector('.custom-typography')
    expect(typography).toBeInTheDocument()
    expect(typography).toHaveClass('custom-typography')
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies variant prop', () => {
    render(<CustomTypography variant="h2">Heading Text</CustomTypography>)
    
    const typography = screen.getByRole('heading', { level: 2 })
    expect(typography).toBeInTheDocument()
    expect(typography).toHaveTextContent('Heading Text')
  })

  it('applies color prop with CSS variable', () => {
    render(<CustomTypography color="primary">Colored Text</CustomTypography>)
    
    const typography = screen.getByText('Colored Text')
    expect(typography).toHaveStyle('color: var(--color-primary)')
  })

  it('applies layout and styling props', () => {
    render(
      <CustomTypography 
        align="center"
        gutterBottom={true}
        noWrap={true}
        id="styled-text"
      >
        Styled Text
      </CustomTypography>
    )
    
    const typography = document.querySelector('#styled-text')
    expect(typography).toBeInTheDocument()
  })

  it('applies custom className and component prop', () => {
    render(
      <CustomTypography 
        component="span"
        className="my-custom-class"
      >
        Custom Component
      </CustomTypography>
    )
    
    const typography = screen.getByText('Custom Component')
    expect(typography.tagName).toBe('SPAN')
    expect(typography).toHaveClass('custom-typography', 'my-custom-class')
  })
})