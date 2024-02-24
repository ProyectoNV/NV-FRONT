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

  const data = [
    { id: 1, nombre: 'Maria', apellidos: 'Alvarado Tapia', asistencias: 7, inasistencias: 3 },
    { id: 2, nombre: 'Pedro', apellidos: 'Arenas Fuentes', asistencias: 6, inasistencias: 4 },
    { id: 3, nombre: 'Clara', apellidos: 'Ballesteros Camacho', asistencias: 9, inasistencias: 1 },
    { id: 4, nombre: 'Chintia', apellidos: 'Cervantes Morales', asistencias: 10, inasistencias: 0 },
    { id: 5, nombre: 'Alberto', apellidos: 'Diaz Sanchez', asistencias: 8, inasistencias: 2 },
    { id: 6, nombre: 'Marlen', apellidos: 'Feria Alvarez', asistencias: 5, inasistencias: 5 },
    { id: 7, nombre: 'Hector', apellidos: 'Garcia Molina', asistencias: 6, inasistencias: 4 },
    { id: 8, nombre: 'Raquel', apellidos: 'Lopez Garduño', asistencias: 10, inasistencias: 0 },
    { id: 9, nombre: 'Claudia', apellidos: 'Medina Vidal', asistencias: 7, inasistencias: 3 },
    { id: 10, nombre: 'Victor', apellidos: 'Zamora Guerrero', asistencias: 8, inasistencias: 2 },
  ];

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
