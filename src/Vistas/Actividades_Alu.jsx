import React from 'react';
import { useState, useRef} from "react";
import SidebarAlum from '../Componentes/Dashboard_alum';
import "../css/Actividades_Alu.css";

const MisActividades = () => {

  var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAlum Move={move_conte}/>
      <div className="info-text">
      <h1>Mis actividades</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre Actividad</th>
            <th>Profesor</th>
            <th>Jornada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Fotografía</td>
            <td>Andrés</td>
            <td>Tarde</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Fútbol Grandes</td>
            <td>Jaime</td>
            <td>Fin de semana</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Refuerzo escolar</td>
            <td>Diana</td>
            <td>Tarde</td>
          </tr>

          <tr>
        <td>4</td>
        <td>Emprendimiento</td>
        <td>David</td>
        <td>Tarde</td>
      </tr>

      <tr>
        <td>5</td>
        <td>Panaderia</td>
        <td>Leonardo</td>
        <td>Mañana</td>
      </tr>
        </tbody>
      </table>
    </div>
    </div>
    
  )
}

export default MisActividades;
