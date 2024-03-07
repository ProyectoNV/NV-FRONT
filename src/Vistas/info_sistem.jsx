import React from "react";
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Child from "../Imagenes/iconos/bx-child.svg";
import Edit from "../Imagenes//iconos/bxs-edit-alt.svg";
import Extension from "../Imagenes/iconos/bxs-extension.svg";
import Gradu from "../Imagenes/iconos/bxs-graduation.svg";
import '../css/styledash.css';

export const Info = () => {
	
	var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
			<SidebarAdmi Move={move_conte}/>
            <div>
			    <div className="info-text">
			        <h1>Información del sistema</h1><br></br>
                    <p>Este es un sistema de información, orientado a la gestion de los datos que involucran a los usuarios y 
                    actividades dentro de la fundación Nueva vida para todos</p>
			    </div>
                <div className="con-article">
					<div className="con-gen">
						<article className="caja-num">
                            <div className="caja-icono">
					            <img src={Child}/>
				            </div>
				            <div className="caja-entidad">
					            Administradores
				            </div>
				            <div className="caja-cantidad">
					            <p>1</p>
					            <small>Activo</small>
				            </div>
			            </article>
					</div>
					<div className="con-gen">
						<a href="/admin/ver_docentes">
						<article className="caja-num">
                            <div className="caja-icono">
					            <img src={Edit}/>
				            </div>
				            <div className="caja-entidad">
					            Docentes
				            </div>
				            <div className="caja-cantidad">
					            <p>20</p>
					            <small>Activo</small>
				            </div>
			            </article>
						</a>
					</div>
					<div className="con-gen">
						<article className="caja-num">
                            <div className="caja-icono">
					            <img src={Gradu}/>
				            </div>
				            <div className="caja-entidad">
					            Alumnos
				            </div>
				            <div className="caja-cantidad">
					            <p>110</p>
					            <small>Activo</small>
				            </div>
			            </article>
					</div>
					<div className="con-gen">
						<article className="caja-num">
                            <div className="caja-icono">
					            <img src={Extension}/>
				            </div>
				            <div className="caja-entidad">
					            Actividades
				            </div>
				            <div className="caja-cantidad">
					            <p>19</p>
					            <small>Activo</small>
				            </div>
			            </article>
					</div>
                </div>
		    </div>
        </div>
    )
}

export default Info