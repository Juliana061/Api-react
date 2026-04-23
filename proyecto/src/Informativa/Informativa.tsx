import "./style.css"

function Informativa  (){
    return(
        <div className="informativa">
            <h1>Acerca de TVMAze</h1>

            <div className="info-card">
                <h2>Que es TVMAze?</h2>
                <p>
                    TVMaze es una base de datos de series de television con informacion
                    detallada sobre shows, episodios, actores y horarios de emision de
                    todo el mundo.
                </p>
            </div>
            
            <div className="info-card">
                <h2>Sobre esta App</h2>
                <p>
                    Esta aplicacion consume la API publica de TVMaze para mostrar un
                    catalogo de series. Puedes explorar shows, filtrarlos por genero,
                    buscar por nombre y guardar tus favoritos.
                </p>
            </div>
            <div className="info-card">
                <h2>Universidad Agustiniana</h2>
                <p>
                 Proyecto desarrollado para la asignatura de Desarrollo Web en la
                 Universidad Agustiniana, Bogota, Colombia.
              </p>
            </div>
        </div>
    )
}
export default Informativa