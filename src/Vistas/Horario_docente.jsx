import React from "react"
import { useState, useRef} from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import Horarios from "../Componentes/cronograma";
import '../css/Formularios.css'

export const CronoDoc = () => {
    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte}/>
            <Horarios/>
        </div>
    )
}

export default CronoDoc