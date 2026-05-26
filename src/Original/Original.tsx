import { useState, useEffect } from 'react'
import "./style.css"

interface Show {
  id: number
  name: string
  genres: string[]
  image: { medium: string } | null
}

const GENEROS = ['Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Science-Fiction', 'Romance', 'Mystery']

function mezclar<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function Original() {
  const [shows, setShows] = useState<Show[]>([])
  const [indice, setIndice] = useState(0)
  const [opciones, setOpciones] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState<string | null>(null)
  const [puntaje, setPuntaje] = useState(0)
  const [ronda, setRonda] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const TOTAL = 10

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows?page=0')
      .then(r => r.json())
      .then((data: Show[]) => {
        const validos = data.filter(s => s.genres.length > 0 && s.image)
        setShows(mezclar(validos))
      })
  }, [])

  useEffect(() => {
    if (shows.length === 0) return
    generarOpciones(shows[indice])
  }, [indice, shows])

  const generarOpciones = (show: Show) => {
    const correcto = show.genres[0]
    const incorrectos = mezclar(GENEROS.filter(g => g !== correcto)).slice(0, 3)
    setOpciones(mezclar([correcto, ...incorrectos]))
    setSeleccion(null)
  }

  const responder = (opcion: string) => {
    if (seleccion) return
    setSeleccion(opcion)
    if (opcion === shows[indice].genres[0]) {
      setPuntaje(p => p + 1)
    }
  }

  const siguiente = () => {
    const nuevaRonda = ronda + 1
    if (nuevaRonda >= TOTAL) {
      setTerminado(true)
    } else {
      setRonda(nuevaRonda)
      setIndice(i => i + 1)
    }
  }

  const reiniciar = () => {
    setShows(s => mezclar(s))
    setIndice(0)
    setRonda(0)
    setPuntaje(0)
    setSeleccion(null)
    setTerminado(false)
  }

  if (shows.length === 0) {
    return <div className="original"><p>Cargando quiz...</p></div>
  }

  if (terminado) {
    return (
      <div className="original" style={{ textAlign: 'center' }}>
        <div className="quiz-resultado">
          <div style={{ fontSize: '64px' }}>
            {puntaje >= 8 ? '🏆' : puntaje >= 5 ? '🎯' : '😅'}
          </div>
          <h1>¡Juego terminado!</h1>
          <p style={{ fontSize: '24px', margin: '16px 0' }}>
            {puntaje} / {TOTAL} correctas
          </p>
          <p style={{ marginBottom: '24px', color: 'var(--text)' }}>
            {puntaje >= 8 ? '¡Eres un experto en series!' : puntaje >= 5 ? '¡Nada mal!' : '¡Sigue practicando!'}
          </p>
          <button className="quiz-btn-reiniciar" onClick={reiniciar}>
            Jugar de nuevo
          </button>
        </div>
      </div>
    )
  }

  const show = shows[indice]
  const correcto = show.genres[0]

  return (
    <div className="original">

      {/* HEADER */}
      <div className="quiz-header">
        <h1>🎭 Quiz de Géneros</h1>
        <div className="quiz-stats">
          <span>Pregunta {ronda + 1}/{TOTAL}</span>
          <span>⭐ {puntaje} pts</span>
        </div>
      </div>

      {/* BARRA DE PROGRESO */}
      <div className="quiz-progreso-bar">
        <div
          className="quiz-progreso-fill"
          style={{ width: `${((ronda) / TOTAL) * 100}%` }}
        />
      </div>

      {/* CARD DEL SHOW */}
      <div className="quiz-card">
        {show.image && (
          <img src={show.image.medium} alt={show.name} className="quiz-img" />
        )}
        <h2 className="quiz-nombre">{show.name}</h2>
        <p className="quiz-pregunta">¿Cuál es el género principal?</p>
      </div>

      {/* OPCIONES */}
      <div className="quiz-opciones">
        {opciones.map(op => {
          let clase = 'quiz-opcion'
          if (seleccion) {
            if (op === correcto) clase += ' correcto'
            else if (op === seleccion) clase += ' incorrecto'
          }
          return (
            <button
              key={op}
              className={clase}
              onClick={() => responder(op)}
              disabled={!!seleccion}
            >
              {op}
            </button>
          )
        })}
      </div>

      {/* FEEDBACK */}
      {seleccion && (
        <div className={`quiz-feedback ${seleccion === correcto ? 'bien' : 'mal'}`}>
          {seleccion === correcto ? '✅ ¡Correcto!' : `❌ Era: ${correcto}`}
        </div>
      )}

      {/* SIGUIENTE */}
      {seleccion && (
        <button className="quiz-btn-siguiente" onClick={siguiente}>
          {ronda + 1 >= TOTAL ? 'Ver resultado' : 'Siguiente →'}
        </button>
      )}

    </div>
  )
}