import React from 'react';
import horariosImg from "../Imagenes/horarios.png";
import actividadesImg from "../Imagenes/actividades.png";
import reportesImg from "../Imagenes/reportes.png";
import { useState, useRef} from "react";
import SidebarAlum from '../Componentes/Dashboard_alum';
import '../css/Menu.css';

const Menu_alum = () => {

  var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAlum Move={move_conte}/>
      <div>
        <div>
        <div className="info-text">
			  <h1>Información del sistema</h1>
              <p>Este es un sistema de información, orientado a la gestion de los datos que involucran a los usuarios y 
                actividades dentro de la fundación Nueva vida para todos</p>
			</div>
      <div className='menu_alum_targe'>
        <div className="contenedor-tarjetas" style={{ padding: '30px 10px' }}>
        <div className="card">
          <a href="#">
            <img src={horariosImg} alt="Horarios" />
            <h4>Horario</h4>
            <p>Con esta opción usted puede acceder a sus horarios dentro de la fundación.</p>
          </a>
        </div>
      </div>

     <div className="contenedor-tarjetas" style={{ padding: '30px 10px' }}>
     <div className="card">
        <a href="#">
          <img src={actividadesImg} alt="Actividades" />
          <h4>Actividades</h4>
          <p>
            Puede visualizar todas las actividades que está cursando dentro de la fundación,
            podrá observar el nombre del docente.
          </p>
        </a>
      </div>
     </div>

      
    <div className="contenedor-tarjetas" style={{ padding: '30px 10px' }}>
    <div className="card">
        <a href="#">
          <img src={reportesImg} alt="Reportes" />
          <h4>Reportes</h4>
          <p>
            Mediante esta opción usted podrá ir a la sección de reportes, en el cual podrá observar sus puntos,
            observaciones y fallas, y también podrá descargarlo en PDF si lo desea.
          </p>
        </a>
      </div>
    </div>
      </div>
      
    </div>
    </div>
    
    </div>
    
  )
}

export default Menu_alum;
