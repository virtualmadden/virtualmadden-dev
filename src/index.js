import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './root/App.js'
import * as serviceWorker from './serviceWorker.js'

import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(<App />)

serviceWorker.unregister()
