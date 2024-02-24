import React from "react"
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Cronograma from "../Componentes/cronograma";
import '../css/cronograma.css'

export const Horario = () => {

    let Data_Horario = Cronograma.map((cro) => (
        <tbody>
            <td>
                <div className="horario-actividad">
                    <strong>{cro.nombre}</strong>
                </div>
                <div className="horario-lugar">
                    {cro.lugar}
                </div>
                <div>
                    <p>Hora Inicio:</p><p className="horario-inicio">{cro.inicio}</p>
                    <p>Hora Final:</p><p className="horario-final">{cro.final}</p>
                </div>
                <div>
                    <p>Docente:</p><p className="horario-docente">{cro.docente}</p>
                </div>
            </td>
        </tbody>
    ));
    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="info-text">
			    <h1>Horario</h1>
                <table className="table_horario">
                    <thead className="th_horario">
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th> 
                        <th>Sabado</th>                   
                    </thead>
                    <tr>
                        {Cronograma.map((cro) => (
                            <td>
                                <div className="horario-actividad">
                                    <strong>{cro.nombre}</strong>
                                </div>
                                <div className="horario-lugar">
                                    {cro.lugar}
                                </div>
                                <div>
                                    <p>Hora Inicio:</p><p className="horario-inicio">{cro.inicio}</p>
                                    <p>Hora Final:</p><p className="horario-final">{cro.final}</p>
                                </div>
                                <div>
                                    <p>Docente:</p><p className="horario-docente">{cro.docente}</p>
                                </div>
                            </td>
                        ))} 
                    </tr>
                    <tr>
                        {Cronograma.map((cro) => (
                            <td>
                                <div className="horario-actividad">
                                    <strong>{cro.nombre}</strong>
                                </div>
                                <div className="horario-lugar">
                                    {cro.lugar}
                                </div>
                                <div>
                                    <p>Hora Inicio:</p><p className="horario-inicio">{cro.inicio}</p>
                                    <p>Hora Final:</p><p className="horario-final">{cro.final}</p>
                                </div>
                                <div>
                                    <p>Docente:</p><p className="horario-docente">{cro.docente}</p>
                                </div>
                            </td>
                        ))} 
                    </tr>
                    <tr>
                        {Cronograma.map((cro) => (
                            <td>
                                <div className="horario-actividad">
                                    <strong>{cro.nombre}</strong>
                                </div>
                                <div className="horario-lugar">
                                    {cro.lugar}
                                </div>
                                <div>
                                    <p>Hora Inicio:</p><p className="horario-inicio">{cro.inicio}</p>
                                    <p>Hora Final:</p><p className="horario-final">{cro.final}</p>
                                </div>
                                <div>
                                    <p>Docente:</p><p className="horario-docente">{cro.docente}</p>
                                </div>
                            </td>
                        ))} 
                    </tr>
                    <tr>
                        {Cronograma.map((cro) => (
                            <td>
                                <div className="horario-actividad">
                                    <strong>{cro.nombre}</strong>
                                </div>
                                <div className="horario-lugar">
                                    {cro.lugar}
                                </div>
                                <div>
                                    <p>Hora Inicio:</p><p className="horario-inicio">{cro.inicio}</p>
                                    <p>Hora Final:</p><p className="horario-final">{cro.final}</p>
                                </div>
                                <div>
                                    <p>Docente:</p><p className="horario-docente">{cro.docente}</p>
                                </div>
                            </td>
                        ))} 
                    </tr>
                </table>
			</div>
        </div>
    )
}

export default Horario