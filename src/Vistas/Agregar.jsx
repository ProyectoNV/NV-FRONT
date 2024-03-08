import React, { useState, useRef,useEffect } from "react";
import Swal from 'sweetalert2';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Agregar.css';
import Verifi from "../Imagenes/Quality Check_Outline.svg";
import Check from "../Imagenes/Checklist_Line.svg";

const Agregar = () => {
    const refModal = useRef();
    const refModal2 = useRef();
    const refmove = useRef();

    const [showe, setShowe] = useState(false);

    const Mostrar = (ref) => {
        ref.current.style.opacity = "1";
        ref.current.style.pointerEvents = "inherit";
    };

    const Ocultar = (ref) => {
        ref.current.style.opacity = "0";
        ref.current.style.pointerEvents = "none";
    }

    const move_conte = () => {
        setShowe(!showe);
    }

    const [listUpdated, setListUpdated] = useState(false)
    const [formactividad, setformActividad] = useState ([])
    const [formadocente, setformadocente] = useState ([])

    useEffect(() => {
        const mosAct = async () => {
            try{
                const getAct = await fetch('http://localhost:4000/actividades/mostrar');
                const dataAct= await getAct.json();
                setformActividad(dataAct);
                console.log(dataAct);
            }catch(error){
                console.log(error);
            }       
        }
        const mosDoce = async () => {
            try{
                const getdoce = await fetch('http://localhost:4000/admin/ver_docentes');
                const datadoce= await getdoce.json();
                setformadocente(datadoce);
                console.log(datadoce);
            }catch(error){
                console.log(error);
            }       
        }
        mosAct();
        mosDoce();
        setListUpdated(false);
    }, [listUpdated])


// endpoint del POST
    const [formulario, setFormulario] = useState({
        Nombre_actividad: "",
        anho_inicio: "",
        foto: null,
        descripcion: "",
        Estadoactividad: true
    });

    const changeregisformulario = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormulario({ ...formulario, [name]: value });
    };

    const [selectFormulario, setSelectFormulario] = useState('')
    const changeselect = (e) => {
        const {  value } = e.target;
        console.log(value)
        setSelectFormulario(...selectFormulario, value );
    };

    

    const fomularioSubmit = async (e) => {
        e.preventDefault(formulario);

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


        try {
            // console.log(formulario)
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
                    anho_inicio: "",
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

   
    // endpoin del PUT

    const fomulariSubmit = async (e) => {
        e.preventDefault(formulario);

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
        const nombre_actividadValido = /^[a-zA-Z]+$/.test(formulario.Nombre_actividad);
        if (!nombre_actividadValido) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: 'El nombre de la actividad debe contener solo letras'
            });
            return;
        }

        try {
             console.log(selectFormulario)
            // solicitud a API 
            const actuaactividad = await fetch("http://localhost:4000/actividades/actualizar/"+ selectFormulario, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            if (actuaactividad.ok) {
                // Mostrar alerta de éxito con SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    text: 'La actividad ha actualizado con éxito'
                });
                // Limpiar el formulario después de agregar la actividad con éxito
                setFormulario({
                    Nombre_actividad: "",
                    anho_inicio: "",
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




    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte} />
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img" alt="verifi" />
                    <h2 className="modal_tittle">¿Estás seguro de Agregar esta actividad?</h2>
                    <p className="modal_paragraph">Una vez agregues esta actividad formará parte del catálogo disponible de actividades</p>
                    <div className="content_modal_b">
                        <a href="#" className="modal_close_actu" id="close_modal_regis" onClick={() => Ocultar(refModal)}>Cancelar</a>
                        <a href="#" className="modal_close_actu" id="Regis" onClick={() => Mostrar(refModal2)}>Agregar</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar" />
                    <label htmlFor="cerrar" id="btn-cerrar" onClick={() => Ocultar(refModal2)}>X</label>
                    <img src={Check} className="modal_img" alt="check" />
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La actividad ha sido agregada con éxito</p>
                </div>
            </section>
            <div className="agregar_view">
                <div className="agre">
                    <div className="info-text">
                        <h1 className="h1_agre">Agregar actividad</h1><br></br>
                    </div>
                </div>
                <div className="con_agre">
                    <h2 className="titlle_agre">Llena los datos de la actividad</h2>
                    <div className="input-group">
                        <form onSubmit={fomularioSubmit}>
                            <label htmlFor="name_act" className="label_agre">Nombre de la actividad:</label>
                            <input type="text" value={formulario.Nombre_actividad} onChange={changeregisformulario} name="Nombre_actividad" placeholder="Nombre de la actividad" id="name_act" className="input_agre" />

                            <label htmlFor="año_act" className="label_agre">Año de Creación:</label>
                            <select value={formulario.anho_inicio} onChange={changeregisformulario} id="año_act" name="anho_inicio" className="select_agre">
                                <option value="">Seleccione el año</option>
                                <option>2023</option>
                                <option>2024</option>
                                
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
                        <h1 className="h1_agre">Actualizar actividad</h1><br></br>
                    </div>
                </div>
                <div className="con_agre">
                    <h2 className="titlle_agre">Escoge actividad </h2>
                    <div className="input-group">
                        <form onSubmit={fomulariSubmit}>
                            

                            <label htmlFor="acti" className="label_agre">Actualizar actividad</label>
                            <select onChange={changeselect} id="actividad" name="acti" className="select_agre">
                                <option value="">Seleccione la actividad</option>
                                {formactividad.map((actNum) =>(
                                    <option key={actNum.id_actividad} value={actNum.id_actividad}> {actNum.Nombre_actividad}</option>
                                ))}
                            </select>

                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="submit" className="btn_agre" id="btn_regis">Actualizar actividad</button>
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
                        <form onSubmit={fomulariSubmit}>
                            <label htmlFor="acti" className="label_agre">Actividades</label>
                            <select onChange={changeselect} id="actividad" name="acti" className="select_agre">
                                <option value="">Seleccione la actividad</option>
                                {formactividad.map((actNum) =>(
                                    <option key={actNum.id_actividad} value={actNum.id_actividad}> {actNum.Nombre_actividad}</option>
                                ))}
                            </select>
                            <label htmlFor="acti" className="label_agre">Docentes</label>
                            <select onChange={changeselect} id="actividad" name="acti" className="select_agre">
                                <option value="">Seleccione la actividad</option>
                                {formadocente.map((docNum) =>(
                                    <option key={docNum.id_usuario} value={docNum.id_usuario}>{docNum.Nombres} {docNum.Apellidos}</option>
                                ))}
                            </select>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="submit" className="btn_agre" id="btn_regis">Actualizar actividad</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Agregar;
