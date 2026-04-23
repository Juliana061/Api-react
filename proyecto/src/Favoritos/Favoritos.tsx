import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import "./style.css"

interface ShowBasic {
  id: number
  name: string
  image: { medium: string } | null
}

function Favoritos() {
  const [favorites, setFavorites] = useState<ShowBasic[]>([])

  useEffect(() => {
    const ids: number[] = JSON.parse(localStorage.getItem('tvFavorites') || '[]')
    if (ids.length === 0) return
    Promise.all(ids.map(id => fetch(`https://api.tvmaze.com/shows/${id}`).then(r => r.json())))
      .then(data => setFavorites(data))
  }, [])

  return (
    <div className="favoritos">
      <h1>Favoritos</h1>
      {favorites.length === 0 ? <p>No tienes favoritos todavia.</p> : (
        <div className="fav-grid">
          {favorites.map(show => (
            <Link to={`/show/${show.id}`} key={show.id} className="fav-card">
              {show.image && <img src={show.image.medium} alt={show.name} />}
              <p>{show.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos 