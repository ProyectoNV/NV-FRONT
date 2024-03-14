import React from "react";
import { useState, useRef} from "react";
import SidebarAlum from "../Componentes/Dashboard_alum";
import Horarios from "../Componentes/cronograma";
import '../css/Lista_pro.css';

export const CronoAlum = () => {

    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}
    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAlum Move={move_conte}/>
            <Horarios/>
        </div> 
        
    )
}

export default CronoAlum;