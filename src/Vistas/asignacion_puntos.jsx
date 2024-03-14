import React, { useState, useRef, useEffect } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import "../css/Registro_asistencia.css"
import Swal from "sweetalert2";
import axios from "axios";

export const Puntos = () => {
    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }
    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;

    const [asignacion, setAsignacion] = useState([]);
    const [puntosActividad, setpuntosActividad] = useState([]);
    const [ActividadDocencte, setActividadDocente] = useState([]);


    useEffect(() => {
        const actividad_docente = async () => {
            try {
                const respuesta = await axios.get('http://localhost:4000/docente/docenteactividad/'+iduser)
                console.log(respuesta.data)
                setActividadDocente(respuesta.data);
            } catch (error) {
                console.log(error);
            };
        }
        actividad_docente()
    }, []);

    useEffect(() => {
        console.log(ActividadDocencte)
        axios.get('http://localhost:4000/docente/listado/' +1)
            .then(response => {
                setAsignacion(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);


    useEffect(() => {
        axios.get('http://localhost:4000/docente/puntosactividad')
            .then(response => {
                setpuntosActividad(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const [selectedPuntos, setSelectedPuntos] = useState({});

    const handleChange = (event, estudianteId) => {
        const { value } = event.target;
        setSelectedPuntos(prevState => ({
            ...prevState,
            [estudianteId]: value
        }));
    };

    const handleSubmitpuntos = async (id_alumno) => {
        const envio = { id_actividad: 1, id_alumno, puntos_id: selectedPuntos[id_alumno] }
        console.log(envio)
        //validar si existe el dato puntos_id
        if (envio.puntos_id) {
            axios.post('http://localhost:4000/docente/puntos', envio)
                .then(response => {
                    Swal.fire({
                        text: "Puntos registrados",
                        icon: "success"
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            Swal.fire({
                text: "No ha seleccionado una cantidad de puntos",
                icon: "error"
            })
        }


    }


    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte} />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}> Listado de Estudiantes</h1><br />
                <div className="container">
                    <table className='table_lista'>
                        <thead className='thead_lista'>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Puntos</th>
                                <th>Guardar</th>
                            </tr>
                        </thead>
                        <tbody className='body_lista'>
                            {asignacion.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.Nombres}</td>
                                    <td>{estudiante.Apellidos}</td>
                                    <td>
                                        <select onChange={(e) => handleChange(e, estudiante.id_alumno)}>
                                            <option>Seleccionar</option>
                                            {puntosActividad.map((puntos, index) => (
                                                <option key={index} value={puntos.id_puntos}>
                                                    {puntos.valor_puntos}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <div className="btn">
                                            <button className="button_formu" type="button" onClick={() => handleSubmitpuntos(estudiante.id_alumno)}>Guardar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Puntos;