import React, { useEffect, useState } from "react"
import axios from "axios"
import "./consulta.css"

function Consulta() {
  const [licencia, setLicencia] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState("")

  const obtenerUltimaLicencia = () => {
    setCargando(true)
    axios.get("http://localhost:5000/api/licencias/ultima")
      .then(res => {
        setLicencia(res.data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error al obtener la última licencia:", err)
        setCargando(false)
      })
  }

  useEffect(() => {
    obtenerUltimaLicencia()
  }, [])

  const eliminarLicencia = () => {
    if (!licencia?._id) return
    if (!window.confirm("¿Estás seguro de que querés eliminar esta licencia?")) return

    axios.delete(`http://localhost:5000/api/licencias/${licencia._id}`)
      .then(() => {
        setMensaje("Licencia eliminada correctamente.")
        setLicencia(null)
      })
      .catch(err => {
        console.error("Error al eliminar licencia:", err)
        setMensaje("Hubo un error al eliminar la licencia.")
      })
  }

  if (cargando) return <p>Cargando...</p>

  return (
    <div className="container">
      <h2>Consulta de licencia</h2>
      {mensaje && <p>{mensaje}</p>}

      {!licencia ? (
        <p>No hay licencias para mostrar.</p>
      ) : (
        <div className="info-box">
          <p>Apellido: <strong>{licencia.apellido}</strong> </p>
          <p>Nombre: <strong>{licencia.nombre}</strong> </p>
          <p>Motivo: <strong>{licencia.motivo}</strong> </p>
          <p>Desde: <strong>{licencia.desde.slice(0, 10).split("-").reverse().join("/")}</strong></p>
          <p>Hasta: <strong>{licencia.hasta.slice(0, 10).split("-").reverse().join("/")}</strong></p>
          <p>{" "}
            {licencia.archivo ? (
              <a
                href={`http://localhost:5000/uploads/${licencia.archivo}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{color:" #000080", fontWeight: "bold"}}
              >
                Ver archivo
              </a>
            ) : ""}
          </p>
          <div className="eliminar">
            <button onClick={eliminarLicencia}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Consulta