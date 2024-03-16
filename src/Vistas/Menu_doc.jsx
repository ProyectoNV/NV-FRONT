import React from "react"
import { useState, useRef, useEffect } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import "../css/Menu_doc.css"
import axios from "axios";
import Swal from "sweetalert2";


export const Menudoc = () => {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }
    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;

    const [ActividadDocente, setActividadDocente] = useState([]);
    const [valorSeleccionado, setValorSeleccionado] = useState();
    const [asignacion, setAsignacion] = useState([]);
    const [puntos, setpuntos] = useState([]);

    
    useEffect(() => {
        const actividad_docente = async () => {
            try {
                const respuesta = await axios.get('http://localhost:4000/docente/docenteactividad/' + iduser)
                console.log(respuesta.data)
                setActividadDocente(respuesta.data);
            } catch (error) {
                console.log(error);
            };
        }
        actividad_docente()
    }, []);

    const handleBuscar = async () => {
        console.log(valorSeleccionado)
        if (valorSeleccionado) {
            try {
                const respuesta = await axios.get('http://localhost:4000/docente/verpuntos/'+ valorSeleccionado)
                setAsignacion(respuesta.data);
            } catch (error) {
                console.log(error);
            };
        } else {
            setAsignacion([])
            Swal.fire({
                text: "No ha seleccionado una actividad",
                icon: "error"
            })

        }
    }

    return (
        <div className={`contenert ${showe ? "space-toggle" : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte} />
            <div style={{ with: "800px" }}>
                <h1 className="title"> Docente</h1>
                <div className="botonbuscar">
                    <select
                        className="actividadesdoc"
                        value={valorSeleccionado}
                        onChange={(e) => setValorSeleccionado(e.target.value)}
                    >
                        <option value="">Seleccionar</option>

                        {ActividadDocente.map((actividad, index) => (
                            <option key={index} value={actividad.Actividad_id}>
                                {actividad.Nombre_actividad}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleBuscar} className="button_formu" type="button">
                        Buscar
                    </button>
                </div>
                <div className="container">
                    <table className="table_lista">
                        <thead className="thead_lista">
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Total Asistencias</th>
                                <th>Total Puntos</th>
                                <th>Total Observaciones</th>
                            </tr>
                        </thead>
                        <tbody className="body_lista">
                            {asignacion.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.nombre_alumno}</td>
                                    <td>{estudiante.apellido_alumno}</td>
                                    <td>{estudiante.total_asistencias}</td>
                                    <td>{estudiante.total_puntos}</td>
                                    <td>{estudiante.total_observaciones}</td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Menudoc