import React, { useState, useEffect, useRef} from "react";
import axios from 'axios';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Buscar from "../Imagenes/iconos/bx-search.svg";
import '../css/Formularios.css'

const Enviar_Reporte = () => {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }

    const [reportes, setReportes] = useState([]);
    const [numero_id, setnumero_id] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (numero_id !== '') {
            console.log(numero_id)
            try {
                const response = await axios.post(`http://localhost:4000/admin/reportes`,{numero_id});
                console.log(response)
                setReportes(response.data)
            } catch (error) {
                console.error('Error de red:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        setnumero_id(e.target.value);
    };

    return (
        <div className={`${showe ? 'space-toggle': null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="info-text">
                <h1>Reporte Alumno</h1>
                <form onSubmit={handleSubmit}>
                    <div className="buscar">
                        <input type="text" placeholder="Ingrese número de documento del estudiante" value={numero_id} onChange={handleInputChange} required />
                        <button type="submit"><img src={Buscar} alt="Buscar" /></button>
                    </div>
                </form>
                <table className="table_horario" border="1">
                    <thead>
                        <tr>
                            <th>Nombre Alumno</th>
                            <th>Apellido Alumno</th>
                            <th>Fecha Observación</th>
                            <th>Descripción Observación</th>
                            <th>Nombre Actividad</th>
                            <th>Total Inasistencias</th>
                            <th>Total Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportes.map((reporte) => (
                            <tr key={reporte.id_alumno}>
                                <td>{reporte.Nombres}</td>
                                <td>{reporte.Apellidos}</td>
                                <td>{reporte.fecha_observacion}</td>
                                <td>{reporte.descripcion_observacion}</td>
                                <td>{reporte.Nombre_actividad}</td>
                                <td>{reporte.Inasistencias}</td>
                                <td>{reporte.Puntos_Totales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Enviar_Reporte;