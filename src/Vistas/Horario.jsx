import React from "react"
import { useState, useRef, useEffect} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Cronograma from "../Componentes/cronograma";
import '../css/cronograma.css'

export const Horario = () => {

    const [listUpdated, setListUpdated] = useState(false);
    const [Lunes, setLunes] = useState([])
    const [Martes, setMartes] = useState([])
    const [Miercoles, setMiercoles] = useState([])
    const [Jueves, setJueves] = useState([])
    const [Viernes, setViernes] = useState([])
    const [Sabado, setSabado] = useState([])

    function compararHoras(a, b){
        const [horaA, minutoA] = a.Hora_inicio.split(":");
        const [horaB, minutoB] = b.Hora_inicio.split(":");

        if(horaA !== horaB){
            return horaA - horaB;
        }
        else{
            return minutoA - minutoB;
        }
    }

    useEffect(() => {
        const TraeCrono = async () => {
            try{
                const getlunes = await fetch('http://localhost:4000/horario/VerCronograma/lunes');
                const datalunes = await getlunes.json();
                datalunes.sort(compararHoras);
                setLunes(datalunes)
                const getmartes = await fetch('http://localhost:4000/horario/VerCronograma/martes');
                const datamartes = await getmartes.json();
                datamartes.sort(compararHoras);
                setMartes(datamartes)
                const getmiercoles = await fetch('http://localhost:4000/horario/VerCronograma/miercoles');
                const datamiercoles = await getmiercoles.json();
                datamiercoles.sort(compararHoras);
                setMiercoles(datamiercoles)
                const getjueves = await fetch('http://localhost:4000/horario/VerCronograma/jueves');
                const datajueves = await getjueves.json();
                datajueves.sort(compararHoras);
                setJueves(datajueves)
                const getviernes = await fetch('http://localhost:4000/horario/VerCronograma/viernes');
                const dataviernes = await getviernes.json();
                dataviernes.sort(compararHoras);
                setViernes(dataviernes)
                const getsabado = await fetch('http://localhost:4000/horario/VerCronograma/sabado');
                const datasabado = await getsabado.json();
                datasabado.sort(compararHoras);
                setSabado(datasabado)
            }catch(error){
                console.log(error);
            }
        }
        TraeCrono()
        setListUpdated(false);
    }, [listUpdated])

    const EliminarHorarioactivi=async (id_actividad, horario_id)=>{
        horario_id = `/${horario_id}`
        try {
            const responseactu = await fetch("http://localhost:4000/horario/EliminarActividadHorario/"+id_actividad+horario_id,{
                method: 'DELETE'
            });

        
            if(responseactu.ok){
                console.log("eliminado")
            }else{
                throw new Error("Error eliminar")
            }

        }catch (error) {
            console.error("Error al eliminar horario: ",error)
        }

        setListUpdated(true)
    }

    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="cronogramas_info">
			    <h1 className="titulo_horario">Horario</h1>
                <table className="table_horario">
                    <thead>
                        <tr>
                            <th colSpan="6">Lunes</th>
                        </tr>
                        <tr >
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Lunes.map((lun , indice) => (
                            <tr key={indice}>
                                <td>{lun.Nombre_actividad}</td>
                                <td>{lun.Lugar}</td>
                                <td>{lun.Hora_inicio}</td>
                                <td>{lun.Hora_fin}</td>
                                <td>{`${lun.Nombres} ${lun.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(lun.id_actividad, lun.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table_horario">
                    <thead>
                        <tr className="th_horario">
                            <th colSpan="6">Martes</th>
                        </tr>
                        <tr className="th_horario">
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Martes.map((mar , indice) => (
                            <tr key={indice}>
                                <td>{mar.Nombre_actividad}</td>
                                <td>{mar.Lugar}</td>
                                <td>{mar.Hora_inicio}</td>
                                <td>{mar.Hora_fin}</td>
                                <td>{`${mar.Nombres} ${mar.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(mar.id_actividad, mar.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table_horario">
                    <thead>
                        <tr className="th_horario">
                            <th colSpan="6">Miercoles</th>
                        </tr>
                        <tr className="th_horario">
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Miercoles.map((mie , indice) => (
                            <tr key={indice}>
                                <td>{mie.Nombre_actividad}</td>
                                <td>{mie.Lugar}</td>
                                <td>{mie.Hora_inicio}</td>
                                <td>{mie.Hora_fin}</td>
                                <td>{`${mie.Nombres} ${mie.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(mie.id_actividad, mie.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table_horario">
                    <thead>
                        <tr className="th_horario">
                            <th colSpan="6">Jueves</th>
                        </tr>
                        <tr className="th_horario">
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Jueves.map((jue , indice) => (
                            <tr key={indice}>
                                <td>{jue.Nombre_actividad}</td>
                                <td>{jue.Lugar}</td>
                                <td>{jue.Hora_inicio}</td>
                                <td>{jue.Hora_fin}</td>
                                <td>{`${jue.Nombres} ${jue.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(jue.id_actividad, jue.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table_horario">
                    <thead>
                        <tr className="th_horario">
                            <th colSpan="6">Viernes</th>
                        </tr>
                        <tr className="th_horario">
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Viernes.map((vie , indice) => (
                            <tr key={indice}>
                                <td>{vie.Nombre_actividad}</td>
                                <td>{vie.Lugar}</td>
                                <td>{vie.Hora_inicio}</td>
                                <td>{vie.Hora_fin}</td>
                                <td>{`${vie.Nombres} ${vie.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(vie.id_actividad, vie.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table_horario">
                    <thead>
                        <tr className="th_horario">
                            <th colSpan="6">Sabado</th>
                        </tr>
                        <tr className="th_horario">
                            <th>Actividad</th>
                            <th>Lugar</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Docente</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Sabado.map((sab , indice) => (
                            <tr key={indice}>
                                <td>{sab.Nombre_actividad}</td>
                                <td>{sab.Lugar}</td>
                                <td>{sab.Hora_inicio}</td>
                                <td>{sab.Hora_fin}</td>
                                <td>{`${sab.Nombres} ${sab.Apellidos}`}</td>
                                <td><button className="eliminarA_H" onClick={() => EliminarHorarioactivi(sab.id_actividad, sab.horario_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
			</div>
        </div>
    )
}

export default Horario