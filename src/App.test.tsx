import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the about page', () => {
    render(<App />)
    expect(screen.getByText('Jonathan Madden')).toBeInTheDocument()
  })
})
