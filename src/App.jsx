import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Consulta from "./pages/Consulta"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/consulta" element={<Consulta />} />
    </Routes>
  )
}

export default App
