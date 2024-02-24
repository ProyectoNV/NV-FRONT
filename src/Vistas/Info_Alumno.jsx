import React from "react"
import { useState, useRef} from "react";
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
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAlum Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de actualizar tus datos</h2>
                    <p className="modal_paragraph">Una vez aceptes la información se guardara automaticamente</p>
                    <div className="content_modal_b">
                        <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Actualizar</a>
                    </div>
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
			    <h1>Información Personal</h1>
                <div>
                    <form className="cont_info">
                        <legend className="info_title">Información Alumno</legend>
                        <div className="info_form">
                            <div class="opcion_block">
                                <label for="pname">Nombres</label>
                                <input id="pname" type="text" name="p_nombre" value="Valery"/>
                            </div>
                            <div class="opcion_block">
                                <label for="psurname">Apellidos</label>
                                <input id="psurname" type="text" name="p_apellido" value="Montaña"/>
                            </div>
                            <div class="opcion_block">
                                <label for="tdocument">Tipo de documento</label>
                                <input list="tdocument" value="T.I"/>
                                <datalist id="tdocument">
                                    <option selected>T.I</option>
                                    <option>C.C</option>
                                    <option>R.C</option>
                                    <option>C.E</option>
                                </datalist>
                            </div>
                            <div class="opcion_block">
                                <label for="ndocument">Numero de documento</label>
                                <input id="ndocument" type="text" name="ndocument" value="1035692486"/>
                            </div>
                            <div>
                                <label for="ncelular">Numero de celular</label>
                                <input id="ncelular" type="text" name="ncelular" value="3153135796"/>
                            </div>
                            <div>
                                <label for="email">Correo Electronico</label>
                                <input id="email" type="email" name="email" value="vlili08@gmail.com"/>
                            </div>
                            <div class="opcion_block">
                                <label for="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" name="date_nacimiento" value="2008-06-08"/>
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Genero</p>
                            <div className="generos">
                                <input type="radio" name="optionsGenero" id="optionsRadios1"/>
                                <label for="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input type="radio" name="optionsGenero" id="optionsRadios2"/>
                                <label for="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                            </div>
                        </div>
                        <div class="btn_actu"><a className="button_formu" type="submit" id="btn_actu-u" onClick={Mostrar}>Actualizar</a></div>
                    </form>
                </div>
                <div>
                    <form class="cont_info">
                        <legend class="info_title">Información Acudiente</legend>
                        <div class="info_form">
                            <div class="opcion_block">
                                <label for="pname-a">Nombres</label>
                                <input id="pname-a" type="text" name="p_nombre-a" value="Rogelio"/>
                            </div>
                            <div class="opcion_block">
                                <label for="psurname-a">Apellidos</label>
                                <input id="psurname-a" type="text" name="p_apellido-a" value="Montaña"/>
                            </div>
                            <div>
                                <label for="ncelular">Numero de celular</label>
                                <input id="ncelular" type="text" name="ncelular" value="3153135796"/>
                            </div>
                            <div>
                                <label for="email">Correo Electronico</label>
                                <input id="email" type="email" name="email" value="vlili08@gmail.com"/>
                            </div>
                            <div class="opcion_block">
                                <label for="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" name="date_nacimiento" value="2008-06-08"/>
                            </div>
                        </div>
                        <div class="btn_actu"><a className="button_formu" type="submit" id="btn_actu-u" onClick={Mostrar}>Actualizar</a></div>
                    </form>
                </div>    
			</div>
        </div>
    )
}

export default Info_alumno