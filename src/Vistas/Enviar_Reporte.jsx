import React, { useState, useRef } from "react";
import axios from 'axios';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Buscar from "../Imagenes/iconos/bx-search.svg";
import '../css/Reportes.css'

const Enviar_Reporte = () => {

    //Mostrar y ocultar el sidebar
    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }
    const [datosEstudiante, setDatosEstudiante] = useState(null);
    const [numero_id, setNumero_id] = useState('');
    const [mostrarTablas, setMostrarTablas] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (numero_id !== '') {
            try {
                const response = await axios.post(`http://localhost:4000/admin/reportes`, { numero_id });
                if (response.data && (response.data.Nombre || response.data.Apellido || response.data.resultadoDatosEstudiante)) {
                    setDatosEstudiante(response.data);
                    setMostrarTablas(true);
                } else {
                    alert(`No hay ningún estudiante con ese número de identificación`);
                    setDatosEstudiante(null);
                    setMostrarTablas(false);
                }
            } catch (error) {
                console.error('Error de red:', error);
                setDatosEstudiante(null);
                setMostrarTablas(false);
            }
        } else {
            setDatosEstudiante(null);
            setMostrarTablas(false);
        }
    };

    const handleInputChange = (e) => {
        setNumero_id(e.target.value);
    };
    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <div className="contenert">
                <SidebarAdmi Move={move_conte} />
                <div className="info-text">
                    <h1>Reporte Alumno</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="buscar">
                            <input
                                type="text"
                                placeholder="Ingrese número de documento del estudiante"
                                value={numero_id}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">
                                <img src={Buscar} alt="Buscar" />
                            </button>
                        </div>
                    </form>
                    {mostrarTablas && datosEstudiante && (
                        <>
                            <h2>Datos del Estudiante</h2>
                            <table className="table_reporte" border="1">
                                <thead>
                                    <tr>
                                        <th>Nombre Alumno</th>
                                        <th>Apellido Alumno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{datosEstudiante.Nombre}</td>
                                        <td>{datosEstudiante.Apellido}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2>Actividades Inscritas</h2>
                            <table className="table_reporte" border="1">
                                <thead>
                                    <tr>
                                        <th>Actividades Inscritas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosEstudiante.resultadoDatosEstudiante &&
                                        Array.isArray(datosEstudiante.resultadoDatosEstudiante) &&
                                        Array.from(
                                            new Set(
                                                datosEstudiante.resultadoDatosEstudiante.flatMap((reporte) =>
                                                    reporte.Actividades_Inscritas.split(', ')
                                                )
                                            )
                                        ).map((actividad) => (
                                            <tr key={actividad}>
                                                <td>{actividad}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            <h2>Detalles del Estudiante</h2>
                            <table className="table_reporte" border="1">
                                <thead>
                                    <tr>
                                        <th>Fecha Observación</th>
                                        <th>Descripción Observación</th>
                                        <th>Nombre Actividad</th>
                                        <th>Total Inasistencias</th>
                                        <th>Total Puntos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosEstudiante.resultadoDatosEstudiante &&
                                        Array.isArray(datosEstudiante.resultadoDatosEstudiante) &&
                                        datosEstudiante.resultadoDatosEstudiante.map((reporte) => (
                                            <tr key={`${reporte.Nombre_actividad}-${reporte.fecha_observacion}`}>
                                                <td>{reporte.fecha_observacion || 'N/A'}</td>
                                                <td>{reporte.descripcion_observacion || 'N/A'}</td>
                                                <td>{reporte.Nombre_actividad || 'N/A'}</td>
                                                <td>{reporte.Inasistencias ?? 'N/A'}</td>
                                                <td>{reporte.Puntos_Totales || 'N/A'}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Enviar_Reporte;