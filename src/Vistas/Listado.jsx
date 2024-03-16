import React, { useState, useRef, useEffect } from 'react';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Lista.css';
import { logRoles } from '@testing-library/react';

const Lis = ({ id }) => {

  const refmove = useRef();
  const [showe, setShowe] = useState(false);
  const move_conte = () => {
    setShowe(!showe);
  };
  const [actividad, setActividad] = useState([]);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const getActualizar = await fetch(`http://localhost:4000/actividades/verlistas/${id}`);
        const dataActualizar = await getActualizar.json();
        setActividad(dataActualizar);
      } catch (error) {
        console.log(error);
        alert('Error');
      }
    };
    obtenerActividades();
  }, [id]);
  
 
  
  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte}/>
      <div style={{ width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}> Listado de Estudiantes</h1><br></br>
        <div className="container">
          <table className='table_lista'>
            <thead className='thead_lista'>
              <tr>
                
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Asistencias</th>
                <th>Inasistencias</th>
                <th>Total clases</th>
               
              </tr>
            </thead>
            <tbody className='body_lista'>
              {actividad.map((persona) => (
                <tr key={persona.id_usuario}>
                  <td>{persona.Nombres}</td>
                  <td>{persona.Apellidos}</td>
                  <td>{persona.asistencias}</td>
                  <td>{persona.clases-persona.asistencias}</td>
                  <td>{persona.clases}</td>

      
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
