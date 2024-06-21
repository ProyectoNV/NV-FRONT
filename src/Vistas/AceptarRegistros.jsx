import React, { useState, useEffect, useRef } from "react";
import SidebarAdmi from '../Componentes/Dashboard_admi'

function AceptarRegistros() {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
      setShowe(!showe)
    }

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte} />
      
      <div className="info-text">
        <h1>Solicitudes de Registro</h1>
        <table>
          
        </table>
        
      </div>
    </div>
  )
}

export default AceptarRegistros