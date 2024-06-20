import React, { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Agregar.css';
import Verifi from "../Imagenes/Quality Check_Outline.svg";
import Check from "../Imagenes/Checklist_Line.svg";

const Agregar = () => {
    const refModal3 = useRef();
    const refmove = useRef();

    const [showe, setShowe] = useState(false);

    const Mostrar = (e) => {
        const myrefValue = refModal3.current;
        myrefValue.style.opacity = "1";
        myrefValue.style.pointerEvents = "inherit";
    };

    const Ocultar = (e) => {
        const myrefocultar = refModal3.current;
        myrefocultar.style.opacity = "0";
        myrefocultar.style.pointerEvents = "none";
    }

    const move_conte = () => {
        setShowe(!showe);
    }

    const [docenteActividad, setDocenteActividad] = useState({
        id_docente: "",
        Actividad_id: ""
    });
    const [listUpdated, setListUpdated] = useState(false);
    const [formactividad, setformActividad] = useState([]);
    const [formadocente, setformadocente] = useState([]);
    const [selectFormulario, setSelectFormulario] = useState('');

    useEffect(() => {
        const mosAct = async () => {
            try {
                const getAct = await fetch('http://localhost:4000/actividades/mostrar');
                const dataAct = await getAct.json();
                setformActividad(dataAct);
                console.log(dataAct);
            } catch (error) {
                console.log(error);
            }
        }
        const mosDoce = async () => {
            try {
                const getdoce = await fetch('http://localhost:4000/admin/ver_docentes');
                const datadoce = await getdoce.json();
                setformadocente(datadoce);
                console.log(datadoce);
            } catch (error) {
                console.log(error);
            }
        }
        mosAct();
        mosDoce();
        setListUpdated(false);
    }, [listUpdated]);

    let fechaactual = new Date();
    let anoac = fechaactual.getFullYear();
    const [formulario, setFormulario] = useState({
        Nombre_actividad: "",
        anho_inicio: anoac,
        foto: "",
        descripcion: "",
        Estadoactividad: true
    });

    const changeregisDocenteActividad = (e) => {
        const { name, value } = e.target;
        setDocenteActividad({ ...docenteActividad, [name]: value });
    }

    const changeregisformulario = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const changeselect = (e) => {
        const { value } = e.target;
        setSelectFormulario(...selectFormulario, value);
    };

    const fomularioSubmit = async (e) => {
        e.preventDefault();

        // Validar si algún campo está vacío
        if (!formulario.Nombre_actividad || !formulario.anho_inicio || !formulario.descripcion) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'Todos los campos son obligatorios. Por favor, completa todos los campos.'
            });
            return; // Detener el envío del formulario si hay campos vacíos
        }

        // Validar que el nombre de la actividad contenga solo letras
        const nombre_actividadValido = /^[a-zA-Z\s]+$/.test(formulario.Nombre_actividad);
        if (!nombre_actividadValido) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'El nombre de la actividad debe contener solo letras y espacios en blanco'
            });
            return;
        }

        // Validar que el nombre de la actividad no esté duplicado (insensible a mayúsculas/minúsculas)
        const nombreExistente = formactividad.some(
            (act) => act.Nombre_actividad.toLowerCase() === formulario.Nombre_actividad.toLowerCase()
        );

        if (nombreExistente) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'El nombre de la actividad ya existe. Por favor, elige un nombre diferente.'
            });
            return;
        }

        try {
            // solicitud a API 
            const response = await fetch("http://localhost:4000/actividades/registrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            if (response.ok) {
                // Mostrar alerta de éxito con SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    text: 'La actividad ha sido agregada con éxito'
                });
                // Limpiar el formulario después de agregar la actividad con éxito
                setFormulario({
                    Nombre_actividad: "",
                    anho_inicio: anoac, // Reiniciar el año actual también
                    foto: "",
                    descripcion: "",
                    Estadoactividad: true
                });
            }
        } catch (error) {
            // Mostrar alerta de error con SweetAlert
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'Error al agregar la actividad'
            });
            console.error('Error al agregar la actividad:', error);
        }
        setListUpdated(true);
    };

    const docenteactividadSubmit = async (e) => {
        e.preventDefault();
        console.log(docenteActividad);
        try {
            const response = await fetch("http://localhost:4000/actividades/insertarDocente", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(docenteActividad)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    text: 'La actividad ha asignado con éxito'
                });
            } else {
                throw new Error("Error al asignar actividad");
            }

        } catch (error) {
            console.error("Error al asignar actividad: ", error);
        }
        setListUpdated(true);
    }

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte} />
            <div className="agregar_view">
                <div className="agre">
                    <div className="info-text">
                        <h1 className="h1_agre">Agregar actividad</h1><br></br>
                    </div>
                </div>
                <div className="con_agre">
                    <h2 className="titlle_agre">Datos de la actividad</h2>
                    <div className="input-group">
                        <form onSubmit={fomularioSubmit}>
                            <label htmlFor="name_act" className="label_agre">Nombre de la actividad:</label>
                            <input type="text" value={formulario.Nombre_actividad} onChange={changeregisformulario} name="Nombre_actividad" placeholder="Nombre de la actividad" id="name_act" className="input_agre" />

                            <label htmlFor="foto" className="label_agre">Imagen de referencia:</label>
                            <select value={formulario.foto} onChange={changeregisformulario} id="foto" name="foto" className="select_agre">
                                <option value="">Seleccione el area que mas se relacione</option>
                                <option value="artes">Artes</option>
                                <option value="belleza">Belleza</option>
                                <option value="cine">Cine</option>
                                <option value="deportes">Deportes</option>
                                <option value="emprendimiento">Emprendimiento</option>
                                <option value="fotografia">Fotografia</option>
                                <option value="gastronomia">Gastronomia</option>
                                <option value="literatura">Literatura</option>
                                <option value="musica">Musica</option>
                                <option value="nado">Nado</option>
                                <option value="salud">Salud</option>
                                <option value="teatro">Teatro</option>
                                <option value="tecnologia">Tecnologia</option>
                                <option value="videojuegos">Videojuegos</option>
                            </select>

                            <label htmlFor="Des_act" className="label_agre">Descripción de la actividad:</label>
                            <textarea value={formulario.descripcion} onChange={changeregisformulario} name="descripcion" className="text-area" cols="30" rows="8"></textarea><br></br>

                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="submit" className="btn_agre" id="btn_regis">Agregar actividad</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="agregar_view">
                <div className="agre">
                    <div className="info-text">
                        <h1 className="h1_agre">Asignar actividad</h1><br></br>
                    </div>
                </div>
                <div className="con_agre">
                    <h2 className="titlle_agre">Escoge actividad </h2>
                    <div className="input-group">
                        <form onSubmit={docenteactividadSubmit}>
                            <label htmlFor="acti" className="label_agre">Actividades</label>
                            <select onChange={changeregisDocenteActividad} id="actividad" name="Actividad_id" className="select_agre">
                                <option value="">Seleccione la actividad</option>
                                {formactividad.map((actNum) => (
                                    <option key={actNum.id_actividad} value={actNum.id_actividad}>{actNum.Nombre_actividad}</option>
                                ))}
                            </select>
                            <label htmlFor="acti" className="label_agre">Docentes</label>
                            <select onChange={changeregisDocenteActividad} id="actividad" name="id_docente" className="select_agre">
                                <option value="">Seleccione la actividad</option>
                                {formadocente.map((docNum) => (
                                    <option key={docNum.id_usuario} value={docNum.id_usuario}>{docNum.Nombres} {docNum.Apellidos}</option>
                                ))}
                            </select>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="submit" className="btn_agre" id="btn_regis">Asignar actividad</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Agregar;
