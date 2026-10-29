import { render, screen, within } from '@testing-library/react'
import App from './App'
import { career, links, strengths } from './content'

describe('App', () => {
  it('introduces Jonathan', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm Jonathan.")
    expect(screen.getByRole('img')).toHaveAccessibleName(/bobblehead/i)
  })

  it('lists every role in order', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Career, abridged' })
    const companies = within(section)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
    expect(companies).toEqual(career.map((role) => role.company))
  })

  it('lists strengths', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: "Things I'm good at" })
    expect(within(section).getAllByRole('listitem')).toHaveLength(strengths.length)
  })

  it('links out to every profile', () => {
    render(<App />)
    for (const { label, href } of links) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('keeps contact details other than profile links off the page', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).not.toMatch(/@gmail\.com|mailto:|tel:/)
  })
})
