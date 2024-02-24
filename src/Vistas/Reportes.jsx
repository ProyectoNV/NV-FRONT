import React from 'react';
import { useState, useRef} from "react";
import SidebarAlum from '../Componentes/Dashboard_alum';
import  "../css/Reportes.css";

const Reporte = () => {

  var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAlum Move={move_conte}/>
      <div>
      <div className="info-text">
        <h1>Mis actividades</h1>
      </div>
      <table className='table_reporte'>
        <thead>
          <tr>
            <th>Nombre Actividad</th>
            <th>Jornada</th>
            <th>Profesor</th>
            <th>fallas</th>
            <th>puntos</th>
            <th>observaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">Fotografía</td>
            <td className="align-middle">Tarde</td>
            <td className="align-middle">Andrés Rodriguez</td>
            <td className="align-middle">4</td>
            <td className="align-middle">20</td>
            <td className="align-middle">
              -Llega tarde usualmente a las clases y ha tenido varios llamados de atención.<br />
              -Tiene un excelente rendimiento en las clases.<br />
            </td>
          </tr>
          <tr>
            <td className="align-middle">Fútbol Grandes</td>
            <td className="align-middle">Tarde</td>
            <td className="align-middle">Larry Herrera</td>
            <td className="align-middle">0</td>
            <td className="align-middle">40</td>
            <td className="align-middle">
              -Tiene un rendimiento óptimo en cada entrenamiento.<br />
              -Es colaborativo y sabe jugar en equipo.<br />
            </td>
          </tr>
          <tr>
            <td className="align-middle">Refuerzo Escolar</td>
            <td className="align-middle">Tarde</td>
            <td className="align-middle">Adriana Arevalo</td>
            <td className="align-middle">5</td>
            <td className="align-middle">0</td>
            <td className="align-middle">
              -No presta atención en los refuerzos y ha agredido a sus compañeros.<br />
              -No cumple con los ejercicios planteados para mejorar.<br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default Reporte;

       