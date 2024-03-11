import React from "react"
import { useState, useRef, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarAlum from "../Componentes/Dashboard_alum";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Formularios.css'

export const Info_alumno = () => {

    var refModal = useRef();
    var refModal2 = useRef();

    const Mostrar = (e) => {
        const myrefValue = refModal.current;
        myrefValue.style.opacity= "1";
        myrefValue.style.pointerEvents= "inherit";
    };

    const Mostrar2 = (e) => {
        const myrefValue = refModal2.current;
        myrefValue.style.opacity= "1";
        myrefValue.style.pointerEvents= "inherit";
    };

    const Ocultar = (e) =>{
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity= "0";
        myrefocultar.style.pointerEvents= "none";
    }

    const Ocultar2 = (e) =>{
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity= "0";
        myrefocultar.style.pointerEvents= "none";
        const myrefocultar2 = refModal2.current;
        myrefocultar2.style.opacity= "0";
        myrefocultar2.style.pointerEvents= "none";
    }
    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

    // Estado para almacenar los datos del alumno
    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;
    const [listUpdated, setListUpdated] = useState(false);
    const [Historial, setHistorial] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        celular: '',
        estado:'',
        nombre_acudiente: '',
        correo_acudiente: '',
        celular_acudiente: ''
    });

    useEffect(() => {
        const RenderInfo = async () => {
            try{
                const respuesta = await axios.get(`http://localhost:4000/alumno/RenderizadoAlumUser/${iduser}`);
                setHistorial(respuesta.data);
            }catch(error){
                console.log(error);
            }
        }
        
        RenderInfo()
        setListUpdated(false);
    }, [listUpdated])

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        
        const { name, value } = e.target;

        // Validación para el campo "numero_id", "celular" y "celular_acudiente" (solo números)
        if (name === 'numero_id' || name === 'celular' || name === 'celular_acudiente') {
            // Si el valor no es vacío y no contiene solo números, no se actualiza el estado
            if (value !== '' && !/^\d+$/.test(value)) {
                return;
            }
        }

        // Validación para los campos que no deben contener números
        if (name === 'Nombres' || name === 'Apellidos' || name === 'nombre_acudiente' || name === 'apellido_acudiente') {
            // Si el valor contiene números, no se actualiza el estado
            if (/\d/.test(value)) {
                return;
            }
        }
        setHistorial({ ...Historial, [e.target.name]: e.target.value });
    };

    // Función para enviar los datos actualizados del alumno al servidor
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Historial.Nombres || !Historial.Apellidos || !Historial.correo || !Historial.celular || !Historial.fecha_nacimiento || !Historial.contrasena || !Historial.genero || !Historial.nombre_acudiente || !Historial.correo_acudiente) {
            Swal.fire({
                title: "Campos requeridos",
                text: "Por favor, completa todos los campos.",
                icon: "error"
            });
            return;
        }
        if (Historial.numero_id.length < 7) {
            Swal.fire({
                title: "Número de identificación inválido",
                text: "El número de identificación debe tener al menos 7 caracteres.",
                icon: "error"
            });
            return;
        }


        try {
            const respuesta = await axios.put(`http://localhost:4000/alumno/actualizaralumno`, Historial);
            if (respuesta.status === 200) {
                Mostrar2();
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al actualizar alumno",
                icon: "error"
            });
            console.error(`Error al actualizar alumno, ${error}`);
        }
    };

    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAlum Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de actualizar tus datos</h2>
                    <p className="modal_paragraph">Una vez aceptes la información se guardara automaticamente</p>
                    <form onSubmit={handleSubmit} className="content_modal_b">
                        <a className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <button type="submit" className="modal_close_actu" id="Regis">Actualizar</button>
                    </form>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La información se ha actualizado con exito</p>
                </div>
            </section>
            <div className="info-text">
                <h1>Historial de Usuario</h1>
                <div>
                    <h3 className="h3_formu">Datos Básicos</h3>
                </div>
                <div>
                    <form className="cont_info">
                        <legend className="info_title">Información Alumno</legend>
                        <div className="info_form">
                            <div>
                                <label htmlFor="pname">Nombres</label>
                                <input id="pname" type="text" name="Nombres" value={Historial.Nombres} onChange={handleChange} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label htmlFor="psurname">Apellidos</label>
                                <input id="psurname" type="text" name="Apellidos" value={Historial.Apellidos} onChange={handleChange} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label htmlFor="tdocument">Tipo de documento</label>
                                <input list="tdocument" name="pkfk_tdoc" value={Historial.pkfk_tdoc} onChange={handleChange} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                                <datalist id="tdocument">
                                    <option value="TI">T.I</option>
                                    <option value="CC">C.C</option>
                                    <option value="RC"> R.C</option>
                                    <option value="CE">C.E</option>
                                </datalist>
                            </div>

                            <div>
                                <label htmlFor="ndocument">Numero de documento</label>
                                <input id="ndocument" type="text" name="numero_id" value={Historial.numero_id} onChange={handleChange} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label htmlFor="ncelular">Numero de celular</label>
                                <input id="ncelular" type="text" name="celular" value={Historial.celular} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Correo Electronico</label>
                                <input id="email" type="email" name="correo" value={Historial.correo} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" name="fecha_nacimiento" value={Historial.fecha_nacimiento.split('T')[0]} onChange={handleChange} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Genero</p>
                            <p className="mensajeblock">Este dato no se puede actualizar</p>
                            <div className="generos" >
                                <input checked={Historial.genero === 'masculino'} type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange} disabled/>
                                <label htmlFor="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input checked={Historial.genero === 'femenino'} type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange} disabled/>
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
                                    <input id="pname-a" type="text" name="nombre_acudiente" value={Historial.nombre_acudiente} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="email-a">Correo Electronico</label>
                                    <input id="email-a" type="email" name="correo_acudiente" value={Historial.correo_acudiente} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="ncelular-a">Numero de celular</label>
                                    <input id="ncelular-a" type="text" name="celular_acudiente" value={Historial.celular_acudiente} onChange={handleChange} />
                                </div>

                            </div>
                            <div className="botones">
                                <div class="btn_actu"><a className="button_formu" type="submit" id="btn_actu-u" onClick={Mostrar}>Actualizar</a></div>
                            </div>
                        </div>

                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Info_alumno