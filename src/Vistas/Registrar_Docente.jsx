import React from "react"
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Formularios.css'

export const Regis_Docente = () => {

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

    const [informacionDocente, setInformacionDocente] = useState({
        tipoDoc: "",
        numeroId: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        celular: ""
    });
    const handleChange = (e) => {
        console.log(e.target.value)
        setInformacionDocente({ ...informacionDocente, [e.target.name]: e.target.value })
    };
    
    const handleSubmit =async (e)=>{
        console.log(informacionDocente)
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/registrar_Docente",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(informacionDocente)
            });
            const data = await response.json()
        } catch (error) {
            console.error(`Error al enviar datos: ${error}`)
        }
    }
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de Registrar a esta persona?</h2>
                    <p className="modal_paragraph">Los Datos de la persona se guardaran en el sistema</p>
                    <div className="content_modal_b">
                        <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Registrar</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La persona se ha registrado con exito</p>
                </div>
            </section>
            <div className="info-text">
			  <h1>Registro de Docentes</h1>
              <div>
                <form className="cont_info" onSubmit={handleSubmit}>
                    <legend className="info_title">Información Docente</legend>
                    <div className="info_form">
                        <div>
                            <label for="pname">Nombres</label>
                            <input id="pname" type="text" name="nombres" onChange={handleChange}/>
                        </div>
                        <div>
                            <label for="psurname">Apellidos</label>
                            <input id="psurname" type="text" name="apellidos" onChange={handleChange}/>
                        </div>
                        <div>
                            <label for="tdocument">Tipo de documento</label>
                            <input list="tdocument" name="tipoDoc"  onChange={handleChange}/>
                            <datalist id="tdocument">
                                <option selected value={"TI"}>T.I</option>
                                <option value={"CC"}>C.C</option>
                                <option value={"RC"}>R.C</option>
                                <option value={"CE"}>C.E</option>
                            </datalist>
                        </div>
                        <div>
                            <label for="ndocument">Numero de documento</label>
                            <input id="document" type="text" name="numeroId" onChange={handleChange}/>
                        </div>
                        <div>
                            <label for="ncelular">Numero de celular</label>
                            <input id="celular" type="text" name="celular" onChange={handleChange}/>
                        </div>
                        <div>
                            <label for="email">Correo Electronico</label>
                            <input id="correo" type="email" name="correo" onChange={handleChange}/>
                        </div>
                        <div>
                            <label for="date_nacimiento">Fecha de nacimiento</label>
                            <input id="fecha_nacimiento" type="date" name="fechaNacimiento" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-genero">
                        <p>Genero</p>
                        <div className="generos">
                            <input type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange}/>
                            <label for="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                        </div>
                        <div className="generos">
                            <input type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange}/>
                            <label for="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                        </div>
                    </div>
                    <div class="btn"><button className="button_formu" type="submit" id="btn_regis" onClick={Mostrar}>Registrar</button></div>
                </form>
              </div>
			</div>
        </div>
    )
}

export default Regis_Docente