import './App.css'

function App() {
  return (
    <>
      <h1>Solicitud de licencia</h1>

      <div className="formulario">
        <form action="/enviar" method="post">
          <div className="apellidoNombre">
            <label htmlFor="apellido">APELLIDO</label>
            <input type="text" name="apellido" id="apellido" required />

            <label htmlFor="nombre">NOMBRE</label>
            <input type="text" name="nombre" id="nombre" required />
          </div>

          <div className="motivoArchivo">
            <div className="motivo">
              <label>MOTIVO DE LICENCIA</label>

              <div className="radio-opcion">
                <input type="radio" name="motivo" id="medica" value="Licencia médica" />
                <label htmlFor="medica">Licencia médica</label>
              </div>

              <div className="radio-opcion">
                <input type="radio" name="motivo" id="familiar" value="Licencia familiar" />
                <label htmlFor="familiar">Licencia familiar</label>
              </div>

              <div className="radio-opcion">
                <input type="radio" name="motivo" id="particulares" value="Causas particulares" required />
                <label htmlFor="particulares">Causas particulares</label>
              </div>
            </div>

            <div className="archivo">
              <input type="file" name="archivo" id="archivo" />
            </div>
          </div>
          
          <div className='desdeHasta'>
            <label htmlFor="desde" id="desde">DESDE</label>
            <input type="date" name="desde" required />

            <label htmlFor="hasta" id="hasta">HASTA</label>
            <input type="date" name="hasta" required />
          </div>

          <button type="submit">ENVIAR</button>
        </form>
      </div>
    </>
  )
}

export default App
