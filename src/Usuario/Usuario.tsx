import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import "./style.css"

export default function Usuario() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modo, setModo] = useState<'login' | 'register'>('login')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setMensaje(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMensaje('❌ ' + error.message)
    else setMensaje('✅ Sesión iniciada')
    setLoading(false)
  }

  const handleRegister = async () => {
    setLoading(true)
    setMensaje(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMensaje('❌ ' + error.message)
    else setMensaje('✅ Cuenta creada, revisa tu correo')
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMensaje('👋 Sesión cerrada')
  }

  if (user) {
    return (
      <div className="usuario">
        <div className="perfil-card">

          {/* AVATAR */}
          <div className="avatar">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          {/* ICONO DE ESTADO - LOGUEADO */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: 'bold' }}>Conectado</span>
          </div>

          <p className="nombre">{user.email}</p>

          <button onClick={handleLogout} style={{ background: '#ef4444' }}>
            Cerrar sesión
          </button>

          {mensaje && <p style={{ marginTop: '12px', fontSize: '14px' }}>{mensaje}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="usuario">
      <div className="perfil-card">

        {/* ICONO DE ESTADO - DESLOGUEADO */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
          <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 'bold' }}>Sin sesión</span>
        </div>

        <h2 style={{ marginBottom: '16px' }}>
          {modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={modo === 'login' ? handleLogin : handleRegister}
          disabled={loading}
        >
          {loading ? 'Cargando...' : modo === 'login' ? 'Entrar' : 'Registrarse'}
        </button>

        <p style={{ marginTop: '12px', fontSize: '13px', cursor: 'pointer', color: 'var(--accent)' }}
          onClick={() => setModo(modo === 'login' ? 'register' : 'login')}>
          {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </p>

        {mensaje && <p style={{ marginTop: '12px', fontSize: '14px' }}>{mensaje}</p>}
      </div>
    </div>
  )
}