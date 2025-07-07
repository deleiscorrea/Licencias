import { useState } from 'react';
import axios from 'axios';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [errorNombreApellido, setErrorNombreApellido] = useState('');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [errorFecha, setErrorFecha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (desde && hasta && desde > hasta) {
      setErrorFecha('La fecha de finalización debe ser posterior a la fecha de inicio.');
      return;
    }
    setErrorFecha('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      await axios.post('http://localhost:5000/api/licencias', formData);
      alert('Formulario enviado correctamente.');
      form.reset();
      setDesde('');
      setHasta('');
      setErrorNombreApellido('');
      navigate('/consulta');
    } catch (err) {
      const mensaje = err.response?.data?.error;
      if (mensaje === 'Nombre o apellido inválido. Solo se permiten letras y espacios.') {
        setErrorNombreApellido("Solo se permiten letras, espacios, guiones y apóstrofes.");
      } else {
        alert('Error al enviar el formulario.');
      }
    }
  };

  return (
    <>
      <h1>Solicitud de licencia</h1>
      <div className="formulario">
        <form onSubmit={handleSubmit}>
          <div className="apellidoNombre">
            <label htmlFor="apellido">APELLIDO</label>
            <input
              type="text"
              name="apellido"
              id={errorNombreApellido ? 'inputTextoError' : ''}
              onChange={() => setErrorNombreApellido('')}
              required
            />

            <label htmlFor="nombre" className='nombre'>NOMBRE</label>
            <input
              type="text"
              name="nombre"
              id={errorNombreApellido ? 'inputTextoError' : ''}
              onChange={() => setErrorNombreApellido('')}
              required
            />
          </div>

          {errorNombreApellido && (
            <p className="errorNombreApellido">{errorNombreApellido}</p>
          )}

          <div className="motivoArchivo">
            <div className="contenedorMotivo">
              <label>MOTIVO DE LICENCIA</label>
              <div className="motivo">
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
              onChange={e => {
                setDesde(e.target.value);
                if (errorFecha) setErrorFecha('');
              }}
              required
            />

            <label htmlFor="hasta" id="hasta">HASTA</label>
            <input
              type="date"
              name="hasta"
              id={errorFecha ? 'inputFechaError' : ''}
              value={hasta}
              onChange={e => {
                setHasta(e.target.value);
                if (errorFecha) setErrorFecha('');
              }}
              required
            />
          </div>

          {errorFecha && (
            <p className="errorFecha">{errorFecha}</p>
          )}
          <div className="enviar">
            <button type="submit">ENVIAR</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
