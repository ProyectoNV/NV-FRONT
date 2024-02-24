import React from "react";
import Actividad from "../Componentes/List_actividades";
import { useState, useRef} from "react";
import { Link } from "react-router-dom";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Lista_pro.css';


export const Listas = () => {

    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="cont_card">
                <h1> Ver Listas</h1>
                <div className="cont_eliminar">
                    {Actividad.map((act) => {
                        return (
                            <div class="card_d">
                                <figure style={{backgroundColor:(act.color)}}>
                                    <img src={act.img}  />
                                </figure>
                                <div class="contenido">
                                    <h3>{act.nombre} </h3>
                                    <p>{act.descripción}  </p>
                                    <a style={{padding: "0"}}><Link to="/lista">Ver Lista</Link></a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div> 
        
    )
}

export default Listas;