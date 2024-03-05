import React from "react"
import { useState, useRef, useEffect} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Cronograma from "../Componentes/cronograma";
import '../css/cronograma.css'

export const Horario = () => {

    const [filtrocro, setFiltrocro]=useState([])
    const [listUpdated, setListUpdated] = useState(false);
    const [listUpdatedRepartir, setListUpdatedRepartir] = useState(false);

    useEffect(() => {
        const TraeCrono = async () => {
            try{
                const getcro = await fetch('http://localhost:4000/VerCronograma');
                const datacro = await getcro.json();
                setFiltrocro(datacro);
                console.log(datacro);
                setListUpdatedRepartir(true);
            }catch(error){
                console.log(error);
            }
        }
        TraeCrono()
        setListUpdated(false);
    }, [listUpdated])

    useEffect(() => {
        const Repartir = async () => {
            console.log(filtrocro)
        }
        Repartir();
        setListUpdatedRepartir(false);
    }, [listUpdatedRepartir])

    

    let Data_Horario = Cronograma.map((cro) => (
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
                    {Data_Horario.map((prue)=>(
                        <tr>{Data_Horario}</tr>
                    ))}
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