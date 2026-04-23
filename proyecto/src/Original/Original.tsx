import { useState } from 'react'
import "./style.css"

interface Show {
  id: number
  name: string
  genres: string[]
  rating: { average: number | null }
  image: { medium: string } | null
  network: { name: string } | null
}

function Original() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ show: Show }[]>([])

  const buscar = async () => {
    if (query.length < 2) return
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    setResults(await res.json())
  }

  return (
    <div className="original">
      <h1>Buscador</h1>
      <div className="search-bar">
        <input type="text" placeholder="Ej: Breaking Bad" value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()} />
        <button onClick={buscar}>Buscar</button>
      </div>
      <div className="results-list">
        {results.map(({ show }) => (
          <div key={show.id} className="result-card">
            {show.image && <img src={show.image.medium} alt={show.name} />}
            <div className="result-info">
              <h3>{show.name}</h3>
              <p>{show.genres.join(', ') || 'N/A'}</p>
              <p>Rating: {show.rating.average ?? 'N/A'}</p>
              <p>{show.network?.name ?? 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Original