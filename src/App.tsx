import { BrowserRouter as Router, Route, Routes, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Home from './Home/Home'
import Original from './Original/Original'
import Show from './Show/Show'
import Informativa from './Informativa/Informativa'
import Usuario from './Usuario/Usuario'
import Favoritos from './Favoritos/Favoritos'
import "./App.css"

function App() {
  const [logueado, setLogueado] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setLogueado(!!data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setLogueado(!!session?.user)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <nav className="c-menu">
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/original">Original</Link>
        <Link to="/informativa">Informativa</Link>

        {/* ICONO DE ESTADO EN MENÚ */}
        <Link to="/usuario" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: logueado ? '#22c55e' : '#ef4444',
            display: 'inline-block'
          }}></span>
          Usuario
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/show/:id" element={<Show />} />
      </Routes>
    </Router>
  )
}

export default App