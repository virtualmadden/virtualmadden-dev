import { render, screen, within } from '@testing-library/react'
import App from './App'
import { about, career, links, projects, strengths } from './content'

describe('App', () => {
  it('introduces Jonathan', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm Jonathan.")
    expect(screen.getByRole('img')).toHaveAccessibleName(/bobblehead/i)
  })

  it('opens with an about paragraph', () => {
    render(<App />)
    expect(screen.getByRole('region', { name: 'About' })).toHaveTextContent(about)
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

  it('lists personal projects, linking the ones with a repo', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Personal projects' })
    expect(within(section).getAllByRole('listitem')).toHaveLength(projects.length)
    for (const project of projects.filter((p) => p.href)) {
      expect(within(section).getByRole('link', { name: project.name })).toHaveAttribute('href', project.href)
    }
  })

  it('links out to every profile', () => {
    render(<App />)
    // Once in the header for skimmers, once in the footer for readers.
    for (const { label, href } of links) {
      const found = screen.getAllByRole('link', { name: label })
      expect(found).toHaveLength(2)
      for (const link of found) expect(link).toHaveAttribute('href', href)
    }
  })

  it('keeps contact details other than profile links off the page', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).not.toMatch(/@gmail\.com|mailto:|tel:/)
  })
})
