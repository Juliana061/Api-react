import "./style.css";
import { useState, useEffect } from 'react'
import { Link } from 'react-router';

interface Show {
  id: number
  name: string
  genres: string[]
  rating: { average: number | null }
  image: { medium: string } | null
}

function Home() {
  const [shows, setShows] = useState<Show[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const generos = ['Todos', 'Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Science-Fiction']

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows?page=0')
      .then(r => r.json())
      .then(data => setShows(data))
  }, [])

  const lista = shows
    .filter(s => filtro === 'Todos' || s.genres.includes(filtro))
    .filter(s => busqueda.length < 3 || s.name.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    <>
      <div className="filtros">
        {generos.map(g => (
          <button key={g} onClick={() => setFiltro(g)} className={filtro === g ? 'activo' : ''}>{g}</button>
        ))}
      </div>
      <input type="text" placeholder="Buscar show..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      <div className="shows-grid">
        {lista.map(show => (
          <Link to={`/show/${show.id}`} key={show.id} className="show-card">
            {show.image ? <img src={show.image.medium} alt={show.name} /> : <div className="no-img">Sin imagen</div>}
            <div className="show-info">
              <h3>{show.name}</h3>
              <p>{show.genres.join(', ') || 'Sin genero'}</p>
              <p>Rating: {show.rating.average ?? 'N/A'}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home