import React from "react"
import { useState, useRef, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarDocente from "../Componentes/Dashboard_doc";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Formularios.css'

export const Info_Docente = () => {

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

    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;
    const [listUpdated, setListUpdated] = useState(false);
    const [infoUsuario, setInfoUsuario] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        celular: ''
    });

    useEffect(() => {
        const RenderInfo = async () => {
            try{
                const respuesta = await axios.get(`http://localhost:4000/Informacion/usuario/${iduser}`);
                setInfoUsuario(respuesta.data);
            }catch(error){
                console.log(error);
            }
        }
        
        RenderInfo()
        setListUpdated(false);
    }, [listUpdated])

    const handleChange = (e) => {
        
        const { name, value } = e.target;

        // Validación para el campo "numero_id", "celular" y "celular_acudiente" (solo números)
        if (name === 'numero_id' || name === 'celular') {
            // Si el valor no es vacío y no contiene solo números, no se actualiza el estado
            if (value !== '' && !/^\d+$/.test(value)) {
                return;
            }
        }

        // Validación para los campos que no deben contener números
        if (name === 'Nombres' || name === 'Apellidos') {
            // Si el valor contiene números, no se actualiza el estado
            if (/\d/.test(value)) {
                return;
            }
        }
        setInfoUsuario({ ...infoUsuario, [e.target.name]: e.target.value });
    };

    const ActuUserSubmit = async (e) => {
        e.preventDefault();
        if (!infoUsuario.Nombres || !infoUsuario.Apellidos || !infoUsuario.correo || !infoUsuario.celular || !infoUsuario.fecha_nacimiento || !infoUsuario.genero) {
            Swal.fire({
                title: "Campos requeridos",
                text: "Por favor, completa todos los campos.",
                icon: "error"
            });
            return;
        }
        if (infoUsuario.numero_id.length < 7) {
            Swal.fire({
                title: "Número de identificación inválido",
                text: "El número de identificación debe tener al menos 7 caracteres.",
                icon: "error"
            });
            return;
        }


        try {
            infoUsuario.fecha_nacimiento = infoUsuario.fecha_nacimiento.split('T')[0]
            const respuesta = await axios.put(`http://localhost:4000/actilizar/InfoUser/${iduser}`, infoUsuario);
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
        setListUpdated(true)
    };

    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de actualizar tus datos</h2>
                    <p className="modal_paragraph">Una vez aceptes la información se guardara automaticamente</p>
                    <form onSubmit={ActuUserSubmit} className="content_modal_b">
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
			    <h1>Información Docente</h1>
                <div>
                    <form className="cont_info">
                        <legend className="info_title">Información Personal</legend>
                        <div className="info_form">
                            <div>
                                <label for="pname">Nombres</label>
                                <input id="pname" type="text" onChange={handleChange} name="Nombres" value={infoUsuario.Nombres} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label for="psurname">Apellidos</label>
                                <input id="psurname" type="text" onChange={handleChange} name="Apellidos" value={infoUsuario.Apellidos} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label for="tdocument">Tipo de documento</label>
                                <input list="tdocument" onChange={handleChange} value={infoUsuario.pkfk_tdoc} name="pkfk_tdoc" readOnly/>
                                <p>Este dato no se puede actualizar</p>
                                <datalist id="tdocument">
                                    <option selected>T.I</option>
                                    <option>C.C</option>
                                    <option>R.C</option>
                                    <option>C.E</option>
                                </datalist>
                            </div>
                            <div>
                                <label for="ndocument">Numero de documento</label>
                                <input id="ndocument" onChange={handleChange} type="text" name="numero_id" value={infoUsuario.numero_id} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                            <div>
                                <label for="ncelular">Numero de celular</label>
                                <input id="ncelular" onChange={handleChange} type="text" name="celular" value={infoUsuario.celular}/>
                            </div>
                            <div>
                                <label for="email">Correo Electronico</label>
                                <input id="email" type="email" onChange={handleChange} name="correo" value={infoUsuario.correo}/>
                            </div>
                            <div>
                                <label for="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" onChange={handleChange} name="fecha_nacimiento" value={infoUsuario.fecha_nacimiento.split('T')[0]} readOnly/>
                                <p>Este dato no se puede actualizar</p>
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Genero</p>
                            <p className="mensajeblock">Este dato no se puede actualizar</p>
                            <div className="generos">
                                <input checked={infoUsuario.genero === 'masculino'} type="radio" onChange={handleChange} name="genero" value="masculino" id="optionsRadios1" disabled/>
                                <label for="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input checked={infoUsuario.genero === 'femenino'} type="radio" onChange={handleChange} name="genero" value="femenino" id="optionsRadios2" disabled/>
                                <label for="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                            </div>
                        </div>
                        <div class="btn_actu"><a className="button_formu" type="submit" id="btn_actu-u" onClick={Mostrar}>Actualizar</a></div>
                    </form>
                </div>
			</div>
        </div>
    )
}

export default Info_Docente