import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [errorFecha, setErrorFecha] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (desde && hasta && desde > hasta) {
      setErrorFecha('La fecha de finalización debe ser posterior a la fecha de inicio.')
      return
    }
    setErrorFecha('')

    const form = e.target
    const formData = new FormData(form)

    try {
      await axios.post('http://localhost:5000/api/licencias', formData)
      alert('Formulario enviado correctamente.')
      form.reset()
      setDesde('')
      setHasta('')
    } catch (err) {
      alert('Error al enviar el formulario.')
    }
  }
  
  return (
    <>
      <h1>Solicitud de licencia</h1>

      <div className="formulario">
        <form onSubmit={handleSubmit} action="/enviar" method="post">
          <div className="apellidoNombre">
            <label htmlFor="apellido">APELLIDO</label>
            <input type="text" name="apellido" id="apellido" required />

            <label htmlFor="nombre">NOMBRE</label>
            <input type="text" name="nombre" id="nombre" required />
          </div>

          <div className="motivoArchivo">
            <div className="motivo">
              <label>MOTIVO DE LICENCIA</label>

              <div className="radioOpcion">
                <input type="radio" name="motivo" id="medica" value="Licencia médica" />
                <label htmlFor="medica">Licencia médica</label>
              </div>

              <div className="radioOpcion">
                <input type="radio" name="motivo" id="familiar" value="Licencia familiar" />
                <label htmlFor="familiar">Licencia familiar</label>
              </div>

              <div className="radioOpcion">
                <input type="radio" name="motivo" id="particulares" value="Causas particulares" required />
                <label htmlFor="particulares">Causas particulares</label>
              </div>
            </div>

            <div className="archivo">
              <input type="file" name="archivo" id="archivo" />
            </div>
          </div>
          
          <div className="desdeHasta">
            <label htmlFor="desde" id="desde">DESDE</label>
            <input 
              type="date" 
              name="desde" 
              id={errorFecha ? 'inputFechaError' : ''}
              value={desde} 
              onChange={e => setDesde(e.target.value)} 
              required
            />

            <label htmlFor="hasta" id="hasta">HASTA</label>
            <input 
              type="date" 
              name="hasta" 
              id={errorFecha ? 'inputFechaError' : ''}
              value={hasta} 
              onChange={e => setHasta(e.target.value)} 
              required
            />
          </div>

          {errorFecha && (
            <p className="errorFecha">{errorFecha}</p>
          )}

          <button type="submit">ENVIAR</button>
        </form>
      </div>
    </>
  )
}

export default App
