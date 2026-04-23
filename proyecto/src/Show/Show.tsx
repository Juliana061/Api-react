import "./style.css";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

interface ShowData {
  id: number
  name: string
  status: string
  premiered: string | null
  genres: string[]
  rating: { average: number | null }
  network: { name: string } | null
  summary: string | null
  image: { medium: string } | null
  language: string | null
}

function Show() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<ShowData | null>(null)
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    if (!id) return
    const favs: number[] = JSON.parse(localStorage.getItem('tvFavorites') || '[]')
    setIsFav(favs.includes(Number(id)))
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(r => r.json())
      .then(json => setData(json))
  }, [id])

  const toggleFav = () => {
    if (!id) return
    let favs: number[] = JSON.parse(localStorage.getItem('tvFavorites') || '[]')
    favs = favs.includes(Number(id)) ? favs.filter(f => f !== Number(id)) : [...favs, Number(id)]
    localStorage.setItem('tvFavorites', JSON.stringify(favs))
    setIsFav(!isFav)
  }

  if (!data) return <p>Cargando...</p>

  return (
    <div className="show-detalle">
      <div className="show-header">
        {data.image && <img src={data.image.medium} alt={data.name} />}
        <div>
          <h1>{data.name}</h1>
          <button className="fav-btn" onClick={toggleFav}>{isFav ? 'En favoritos' : 'Agregar a favoritos'}</button>
          <p><strong>Estado:</strong> {data.status}</p>
          <p><strong>Idioma:</strong> {data.language ?? 'N/A'}</p>
          <p><strong>Generos:</strong> {data.genres.join(', ') || 'N/A'}</p>
          <p><strong>Inicio:</strong> {data.premiered ?? 'N/A'}</p>
          <p><strong>Rating:</strong> {data.rating.average ?? 'N/A'}</p>
          <p><strong>Red:</strong> {data.network?.name ?? 'N/A'}</p>
        </div>
      </div>
      {data.summary && <div className="show-summary" dangerouslySetInnerHTML={{ __html: data.summary }} />}
    </div>
  )
}

export default Show