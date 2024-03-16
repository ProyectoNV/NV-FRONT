import React from 'react';
import { useState, useRef, useEffect} from "react";
import SidebarAlum from '../Componentes/Dashboard_alum';
import  "../css/Reportes.css";

const Reporte = () => {

  var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

  const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const getActualizar = await fetch(`http://localhost:4000/alumno/ActividadesAlumno/${iduser}`);
        const dataActualizar = await getActualizar.json();
        setActividades(dataActualizar);
      } catch (error) {
        console.log(error);
        alert('Error');
      }
    };
    
    obtenerActividades();
  }, []);

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
            <th>Profesor</th>
            <th>Asistencias</th>
            <th>fallas</th>
            <th>Clases Realisadas</th>
          </tr>
        </thead>
        <tbody>
            {actividades.map((persona) => (
              <tr key={persona.id_alumno}>
                <td className="align-middle">{persona.Nombre_actividad}</td>
                <td className="align-middle">{`${persona.nombres_docente} ${persona.apellidos_docente}`}</td>
                <td className="align-middle">{persona.asistencias}</td>
                <td className="align-middle">{persona.clases-persona.asistencias}</td>
                <td className="align-middle">{persona.clases}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default Reporte;

       