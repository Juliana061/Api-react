import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import Home from './Home/Home'
import Original from './Original/Original'
import Show from './Show/Show'
import Informativa from './Informativa/Informativa'
import Usuario from './Usuario/Usuario'
import Favoritos from './Favoritos/Favoritos'
import "./App.css"

function App() {
  return (
    <Router>
      <nav className="c-menu">
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/original">Original</Link>
        <Link to="/informativa">Informativa</Link>
        <Link to="/usuario">Usuario</Link>
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