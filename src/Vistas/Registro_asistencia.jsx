import React, { useState, useRef, useEffect } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import "../css/Registro_asistencia.css";
import Swal from "sweetalert2";

export const Registro = () => {
    const [showe, setShowe] = useState(false);
    const [asistencias, setAsistencias] = useState({});
    const [observacion, setObservacion] = useState([]);
    const [ActividadDocente, setActividadDocente] = useState([]);
    const [valorSeleccionado, setValorSeleccionado] = useState();
    const [asistenciasConfirmadas, setAsistenciasConfirmadas] = useState({});

    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;

    useEffect(() => {
        const fetchActividadDocente = async () => {
            try {
                const response = await fetch('http://localhost:4000/docente/docenteactividad/' + iduser);
                const data = await response.json();
                console.log(data);
                setActividadDocente(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchActividadDocente();
    }, []);

    const handleBuscar = async () => {
        console.log(valorSeleccionado);
        if (valorSeleccionado) {
            try {
                const response = await fetch('http://localhost:4000/docente/listado/' + valorSeleccionado);
                const data = await response.json();
                setObservacion(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setObservacion([]);
            Swal.fire({
                text: "No ha seleccionado una actividad",
                icon: "error"
            });
        }
    };

    const handleCheckboxChange = (id_alumno, isChecked, type) => {
        if (isChecked) {
            setAsistencias(prevState => ({
                ...prevState,
                [id_alumno]: type === 'asistencia' ? 1 : 0
            }));
        } else {
            const { [id_alumno]: removed, ...rest } = asistencias;
            setAsistencias(rest);
        }
    };

    const handleEnviarAsistencia = async (id_alumno) => {
        const asistencia = asistencias[id_alumno];
        if (typeof asistencia === 'undefined') {
            Swal.fire({
                text: "Seleccione si el estudiante asistió o no",
                icon: "error"
            });
            return;
        }

        const asistenciaConfirmada = asistenciasConfirmadas[valorSeleccionado] && asistenciasConfirmadas[valorSeleccionado][id_alumno];
        if (asistenciaConfirmada) {
            Swal.fire({
                text: "Ya se ha registrado una asistencia para este alumno y esta actividad en este día",
                icon: "error"
            });
            return;
        }

        try {
            const envio = {
                Actividad_id : valorSeleccionado,
                id_alumno,
                fecha_asistencia: new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD
                Confirmacion: asistencia === 1
            };

            const response = await fetch('http://localhost:4000/docente/registrarAsistencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(envio),
            });

            if (!response.ok) {
                throw new Error('Error al registrar observaciones');
            }

            setAsistenciasConfirmadas(prevState => ({
                ...prevState,
                [valorSeleccionado]: {
                    ...prevState[valorSeleccionado],
                    [id_alumno]: true
                }
            }));

            Swal.fire({
                text: "Asistencia registrada",
                icon: "success"
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                text: "Hubo un error al registrar la asistencia",
                icon: "error"
            });
        }
    };

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={useRef()}>
            <SidebarDocente Move={() => setShowe(!showe)} />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}>Listado de Estudiantes</h1><br />
                <div className="botonbuscar">
                <select className='actividadesdoc' value={valorSeleccionado} onChange={(e) => setValorSeleccionado(e.target.value)}>
                    <option value=''>Seleccionar</option>

                    {ActividadDocente.map((actividad, index) => (
                        <option key={index} value={actividad.Actividad_id}>
                            {actividad.Nombre_actividad}
                        </option>
                    ))}
                </select>
                    <button onClick={handleBuscar} className="button_formu" type="button">Buscar</button>
                </div>
                <div className="container">
                    <table className='table_lista'>
                        <thead className='thead_lista'>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Asistencia</th>
                                <th>Inasistencia</th>
                                <th>Fecha de Asistencia</th>
                                <th>Confirmar</th>
                            </tr>
                        </thead>
                        <tbody className='body_lista'>
                            {observacion.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.Nombres}</td>
                                    <td>{estudiante.Apellidos}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(estudiante.id_alumno, e.target.checked, 'asistencia')}
                                            checked={asistencias[estudiante.id_alumno] === 1}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(estudiante.id_alumno, e.target.checked, 'inasistencia')}
                                            checked={asistencias[estudiante.id_alumno] === 0}
                                        />
                                    </td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        <div className="btn">
                                            <button className="button_formu" type="button" onClick={() => handleEnviarAsistencia(estudiante.id_alumno)}>Confirmar</button>
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
};

export default Registro;