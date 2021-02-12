import React from 'react'
import ReactDOM from 'react-dom'

import App from './root/App.js'
import * as serviceWorker from './serviceWorker.js'

import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
