import React from 'react';
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Lista.css';

const Lis = () => {

  var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

  const data = [];

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte}/>
      <div style={{width: '100%'}}>
        <h1 style={{textAlign: 'center'}}> Listado de Estudiantes</h1><br></br>
        <div className="container">
          <table className='table_lista'>
            <thead className='thead_lista'>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Asistencias</th>
                <th>Inasistencias</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className='body_lista'>
              {data.map((persona) => (
                <tr key={persona.id}>
                  <td>{persona.id}</td>
                  <td>{persona.nombre}</td>
                  <td>{persona.apellidos}</td>
                  <td>{persona.asistencias}</td>
                  <td>{persona.inasistencias}</td>
                  <td>{persona.asistencias + persona.inasistencias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Lis;
