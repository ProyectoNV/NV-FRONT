import React from "react";
import Actividad from "../Componentes/List_actividades";
import { useState, useRef} from "react";
import SidebarAlum from "../Componentes/Dashboard_alum";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Lista_pro.css';

export const Inscrip = () => {

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

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAlum Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de inscribirte a esta actividad?</h2>
                    <p className="modal_paragraph">Una vez aceptes se enviara la solicitud para inscribirse</p>
                    <div className="content_modal_b">
                        <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Inscribirse</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La solicitud se ha enviado con exito</p>
                </div>
            </section>
            <div className="cont_card">
                <h1> Inscribirse actividades</h1>
                <div className="cont_eliminar">
                    {Actividad.map((act) => {
                        return (
                            <div class="card_d">
                                <figure style={{backgroundColor:(act.color)}}>
                                    <img src={act.img}  />
                                </figure>
                                <div class="contenido">
                                    <h3>{act.nombre} </h3>
                                    <p>{act.descripción}  </p>
                                    <a onClick={Mostrar}>Inscribirse actividad</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div> 
        
    )
}

export default Inscrip;
