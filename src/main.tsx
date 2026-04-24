import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function Root() {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 3000)
    return () => clearTimeout(t)
  }, [])

  if (splash) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#16171d',
        color: '#fff',
        fontSize: '24px',
        gap: '16px'
      }}>
        <div style={{ fontSize: '80px' }}>📺</div>
        <p>TVMaze App</p>
      </div>
    )
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)