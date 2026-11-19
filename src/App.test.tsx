import { render, screen, within } from '@testing-library/react'
import App from './App'
import { about, career, links, projects, strengths } from './content'

describe('App', () => {
  it('introduces Jonathan', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm Jonathan.")
    expect(screen.getByRole('img')).toHaveAccessibleName(/bobblehead/i)
  })

  it('offers the portrait as AVIF and WebP ahead of the JPEG fallback', () => {
    render(<App />)
    const types = [...screen.getByRole('img').parentElement!.querySelectorAll('source')].map((s) => s.type)
    expect(types).toEqual(['image/avif', 'image/webp', 'image/jpeg'])
  })

  it('opens with an about paragraph', () => {
    render(<App />)
    expect(screen.getByRole('region', { name: 'About' })).toHaveTextContent(about)
  })

  it('lists every role in order', () => {
    render(<App />)
    const timeline = screen.getByRole('list', { name: 'Career, abridged' })
    const companies = within(timeline)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
    expect(companies).toEqual(career.map((role) => role.company))
  })

  it('closes the career story with strengths', () => {
    render(<App />)
    const career = screen.getByRole('region', { name: 'Career, abridged' })
    const list = within(career).getByRole('list', { name: 'Along the way, I got good at' })
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual(strengths)
  })

  it('lists personal projects, linking the ones with a repo', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Personal projects' })
    expect(within(section).getAllByRole('listitem')).toHaveLength(projects.length)
    for (const project of projects.filter((p) => p.href)) {
      expect(within(section).getByRole('link', { name: project.name })).toHaveAttribute('href', project.href)
    }
  })

  it('tags a project with its latest release, or else its status', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Personal projects' })
    const card = (name: string) => within(section).getByRole('heading', { name }).closest('li')!
    expect(within(card('gac-redux')).getByText('v1.2.3')).toBeInTheDocument()
    expect(within(card('gac-redux')).queryByText('Beta')).not.toBeInTheDocument()
    expect(within(card('Coffee Passport')).getByText('Brewing')).toBeInTheDocument()
  })

  it('links out to every profile once, from the header', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    for (const { label, href } of links) {
      expect(screen.getAllByRole('link', { name: label })).toHaveLength(1)
      expect(within(header).getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('offers only the site address for email, never a personal one', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).not.toMatch(/@gmail\.com|tel:/)
    const mailto = [...container.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute('href'))
    expect(new Set(mailto)).toEqual(new Set(['mailto:hello@virtualmadden.dev']))
  })

  it('opens profiles in a new tab but leaves email to the mail app', () => {
    render(<App />)
    for (const link of screen.getAllByRole('link', { name: 'Email' })) expect(link).not.toHaveAttribute('target')
    for (const link of screen.getAllByRole('link', { name: 'GitHub' })) expect(link).toHaveAttribute('target', '_blank')
  })
})
