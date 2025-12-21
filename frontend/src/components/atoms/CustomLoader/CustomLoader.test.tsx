import { render } from '@testing-library/react'
import CustomLoader from './CustomLoader'

describe('CustomLoader', () => {
  it('renders with default props and custom className', () => {
    render(<CustomLoader />)
    
    const loader = document.querySelector('.custom-loader')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('custom-loader')
  })

  it('applies size prop', () => {
    const { container } = render(<CustomLoader size={50} />)
    
    const loader = container.querySelector('.custom-loader')
    expect(loader).toHaveStyle('width: 50px')
    expect(loader).toHaveStyle('height: 50px')
  })

  it('applies color prop', () => {
    render(<CustomLoader color="secondary" />)
    
    const loader = document.querySelector('.custom-loader')
    expect(loader).toBeInTheDocument()
  })

  it('applies custom className and id', () => {
    render(<CustomLoader className="my-custom-class" id="test-loader" />)
    
    const loader = document.querySelector('#test-loader')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('custom-loader', 'my-custom-class')
  })

  it('applies thickness prop', () => {
    render(<CustomLoader thickness={2.5} />)
    
    const loader = document.querySelector('.custom-loader')
    expect(loader).toBeInTheDocument()
    
    const svgCircle = loader?.querySelector('svg circle')
    expect(svgCircle).toBeInTheDocument()
  })
})