import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutPage from '../AboutPage'

describe('AboutPage Smoke Tests', () => {
  it('should render without crashing', () => {
    render(<AboutPage />)
    expect(screen.getByText('Jonathan Madden')).toBeInTheDocument()
  })

  it('should display the name and title', () => {
    render(<AboutPage />)
    expect(screen.getByText('Jonathan Madden')).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
  })

  it('should display the about section with description', () => {
    render(<AboutPage />)
    expect(screen.getByText(/Sed ut perspiciatis/)).toBeInTheDocument()
  })

  it('should render the card container', () => {
    const { container } = render(<AboutPage />)
    expect(container.querySelector('.card')).toBeInTheDocument()
  })

  it('should render thumbnail image', () => {
    const { container } = render(<AboutPage />)
    const thumbnail = container.querySelector('.thumbnail img')
    expect(thumbnail).toBeInTheDocument()
    expect(thumbnail).toHaveAttribute('alt')
  })

  it('should render date section with month and day', () => {
    const { container } = render(<AboutPage />)
    const dateSection = container.querySelector('.date')
    expect(dateSection).toBeInTheDocument()
    expect(dateSection.querySelector('h5')).toBeInTheDocument()
    expect(dateSection.querySelector('h6')).toBeInTheDocument()
  })

  it('should render social icons list', () => {
    const { container } = render(<AboutPage />)
    const socialList = container.querySelector('.social ul')
    expect(socialList).toBeInTheDocument()
    const socialItems = socialList.querySelectorAll('li')
    expect(socialItems.length).toBe(3)
  })

  it('should render social icons with font awesome classes', () => {
    const { container } = render(<AboutPage />)
    const icons = container.querySelectorAll('.social i')
    expect(icons.length).toBe(3)
    expect(icons[0]).toHaveClass('fas', 'fa-at')
    expect(icons[1]).toHaveClass('fab', 'fa-linkedin-in')
    expect(icons[2]).toHaveClass('fas', 'fa-hashtag')
  })

  it('should render resume download button', () => {
    const { container } = render(<AboutPage />)
    const resumeButton = container.querySelector('.resume i')
    expect(resumeButton).toBeInTheDocument()
    expect(resumeButton).toHaveClass('fa', 'fa-arrow-down')
  })

  it('should have correct structure with all main sections', () => {
    const { container } = render(<AboutPage />)
    expect(container.querySelector('.thumbnail')).toBeInTheDocument()
    expect(container.querySelector('.about')).toBeInTheDocument()
    expect(container.querySelector('.date')).toBeInTheDocument()
    expect(container.querySelector('.social')).toBeInTheDocument()
    expect(container.querySelector('.resume')).toBeInTheDocument()
  })
})
