import React from "react"
import { useState, useRef } from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Verifi from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import Buscar from "../Imagenes/iconos/bx-search.svg"
import '../css/Formularios.css'
import Swal from "sweetalert2";
import axios from "axios";

export const Historial_user = () => {

    var refModal = useRef();
    var refModal2 = useRef();

    const Mostrar = (e) => {
        const myrefValue = refModal.current;
        myrefValue.style.opacity = "1";
        myrefValue.style.pointerEvents = "inherit";
    };

    const Mostrar2 = (e) => {
        const myrefValue = refModal2.current;
        myrefValue.style.opacity = "1";
        myrefValue.style.pointerEvents = "inherit";
    };

    const Ocultar = (e) => {
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity = "0";
        myrefocultar.style.pointerEvents = "none";
    }

    const Ocultar2 = (e) => {
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity = "0";
        myrefocultar.style.pointerEvents = "none";
        const myrefocultar2 = refModal2.current;
        myrefocultar2.style.opacity = "0";
        myrefocultar2.style.pointerEvents = "none";
    }

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }

    const [alumnos, setAlumnos] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        celular: '',
        contrasena: '',
        nombre_acudiente: '',
        correo_acudiente: '',
        celular_acudiente: ''
    });
    
    const handleChange = (e) => {
         //console.log(e.target.value)
        setAlumnos({ ...alumnos, [e.target.name]: e.target.value })
    };
    const [actualizarDa, setactualizarDa]= useState(0)

    const handleActualizar = (e) => {
        //console.log(e.target.value)
       setactualizarDa( e.target.value )
   };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await axios.put("http://localhost:4000/alumno/actualizaralumno"+actualizarDa, alumnos)
            // console.log(respuesta.data)        
            respuesta.status === 200 && Swal.fire({
                text:"actualizacion exitoso",
                icon:"success"
            });
        } catch (error) {
            Swal.fire({
                title:"Error",
                text:"Error al actualizar alumno",
                icon:"error"

            })
            console.error(`Error al actualizar alumno, ${error}`);
        }
    };


    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte} />
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img" />
                    <h2 className="modal_tittle">¿Estas seguro de actualizar tus datos</h2>
                    <p className="modal_paragraph">Una vez aceptes la información se guardara automaticamente</p>
                    <div className="content_modal_b">
                        <a href="#" className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" className="modal_close_actu" id="Regis" onClick={Mostrar2}>Actualizar</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar" />
                    <label htmlFor="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img" />
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La información se ha actualizado con exito</p>
                </div>
            </section>
            <div className="info-text">
                <h1>Historial de Usuario</h1>
                <div className="buscar">
                    <input type="text" onChange={handleActualizar} placeholder="Ingrese numero de documento del estudiante" required />
                    <div className="buscar_icon">
                        <i><img src={Buscar} /></i>
                    </div>
                </div><br></br>
                <div>
                    <h3 className="h3_formu">Datos Basicos</h3>
                </div>
                <div>
                    <form className="cont_info" onSubmit={handleSubmit}>
                        <legend className="info_title">Información Alumno</legend>
                        <div className="info_form">
                            <div>
                                <label htmlFor="pname">Nombres</label>
                                <input id="pname" type="text" name="Nombres" value={alumnos.Nombres} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="psurname">Apellidos</label>
                                <input id="psurname" type="text" name="Apellidos" value={alumnos.Apellidos} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="tdocument">Tipo de documento</label>
                                <input list="tdocument" name="pkfk_tdoc" value={alumnos.pkfk_tdoc} onChange={handleChange} />
                                <datalist id="tdocument">
                                    <option value="TI">T.I</option>
                                    <option value="CC">C.C</option>
                                    <option value="RC"> R.C</option>
                                    <option value="CE">C.E</option>
                                </datalist>
                            </div>

                            <div>
                                <label htmlFor="ndocument">Numero de documento</label>
                                <input id="ndocument" type="text" name="numero_id" value={alumnos.numero_id} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ncelular">Numero de celular</label>
                                <input id="ncelular" type="text" name="celular" value={alumnos.celular} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Correo Electronico</label>
                                <input id="email" type="email" name="correo" value={alumnos.correo} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" name="fecha_nacimiento" value={alumnos.fecha_nacimiento} onChange={handleChange} />
                            </div>
                            <div className="pname">
                                <label htmlFor="contrasena">Contraseña</label>
                                <input id="contrasena" name="contrasena" type="text" value={alumnos.contrasena} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Genero</p>
                            <div className="generos" >
                                <input type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange} />
                                <label htmlFor="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange} />
                                <label htmlFor="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                            </div>
                        </div>


                        {/* Informacion Acudiente */}
                        <div>
                            {/* <form className="cont_info" > */}
                            <legend className="info_title">Información Acudiente</legend>
                            <div className="info_form">
                                <div>
                                    <label htmlFor="pname-a">Nombre acudiente</label>
                                    <input id="pname-a" type="text" name="nombre_acudiente" value={alumnos.nombre_acudiente} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="email-a">Correo Electronico</label>
                                    <input id="email-a" type="email" name="correo_acudiente" value={alumnos.correo_acudiente} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="ncelular-a">Numero de celular</label>
                                    <input id="ncelular-a" type="text" name="celular_acudiente" value={alumnos.celular_acudiente} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="btn"><button className="button_formu" type="submit" >Actualizar</button></div>

                        </div>

                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Historial_user