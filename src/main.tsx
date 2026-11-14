import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource/ibm-plex-mono/400.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/redesign.css'
import './styles/studio.css'
import './styles/studio-support.css'
import './styles/studio-projects.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
