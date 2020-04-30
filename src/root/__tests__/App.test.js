import React from 'react'
import { render } from '@testing-library/react'

import App from '../App.js'

test('renders', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Jonathan Madden/i)
  expect(linkElement).toBeInTheDocument()
})
