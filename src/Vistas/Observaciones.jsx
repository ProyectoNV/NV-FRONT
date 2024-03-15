import React, { useState, useRef, useEffect } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import "../css/Registro_asistencia.css"
import Swal from "sweetalert2";
import axios from "axios";

export const Observaciones = () => {
    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }
    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;

    const [observacion, setObservacion] = useState([]);
    const [valorSeleccionado, setValorSeleccionado] = useState();
    const [ActividadDocente, setActividadDocente] = useState([]);
    
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

    const handleBuscar = async ()=>{
        console.log(valorSeleccionado)
        if(valorSeleccionado){
            try {
                const respuesta = await axios.get('http://localhost:4000/docente/listado/' + valorSeleccionado)
                setObservacion(respuesta.data);
            } catch (error) {
                console.log(error);
            };
        }else{
            setObservacion([])
            Swal.fire({
                text: "No ha seleccionado una actividad",
                icon: "error"
            })

        }
    }


    const [selectedObservacion, setSelectedObservacion] = useState({});

    const handleChange = (event, estudianteId) => {
        const { value } = event.target;
        setSelectedObservacion(prevState => ({
            ...prevState,
            [estudianteId]: value
        }));
    };

    const handleSubmitobservacion = async (id_alumno) => {
        const envio = { 
            Actividad_id: valorSeleccionado, 
            id_alumno, 
            fecha_observacion: new Date().toISOString().slice(0, 10), // Formato: YYYY-MM-DD
            descripcion_observacion: selectedObservacion[id_alumno]
        };
        
        console.log(envio)
        //validar si existe el dato puntos_id
        if(envio.descripcion_observacion){
            axios.post('http://localhost:4000/docente/observaciones', envio)
            .then(response => {
                Swal.fire({
                    text: "Observaciones registradas",
                    icon: "success"
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }else{
            Swal.fire({
                text: "No ha ingresado ninguna observacion",
                icon: "error"
            })
        } 
        

    }


    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte} />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}> Listado de Estudiantes</h1><br />
                
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
                                <th>Observaciones</th>
                                <th>Fecha</th>
                                <th>Guardar</th>
                            </tr>
                        </thead>
                        <tbody className='body_lista'>
                            {observacion.map((estudiante, index) => (
                                <tr key={index}>
                                    <td>{estudiante.Nombres}</td>
                                    <td>{estudiante.Apellidos}</td>
                                    <td>
                                        <textarea onChange={(e) => handleChange(e, estudiante.id_alumno)}>   
                                        </textarea>
                                    </td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        <div className="btn">
                                            <button className="button_formu" type="button" onClick={() => handleSubmitobservacion(estudiante.id_alumno)}>Guardar</button>
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

export default Observaciones;