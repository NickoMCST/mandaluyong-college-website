import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ImageOverridesProvider } from './lib/imageOverrides'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImageOverridesProvider>
      <App />
    </ImageOverridesProvider>
  </React.StrictMode>,
)
