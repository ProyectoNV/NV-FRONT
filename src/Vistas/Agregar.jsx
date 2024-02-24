import React from "react";
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Agregar.css';
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";

const Agregar = () => {

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
      <SidebarAdmi Move={move_conte}/>
      <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de Agregar esta actividad?</h2>
                    <p className="modal_paragraph">Una vez agreges esta actividad formara a ser parte del catalogo disponible de actividades</p>
                    <div className="content_modal_b">
                        <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Agregar</a>
                    </div>
                </div>
      </section>
      <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La actividad ha sido agregada con exito</p>
                </div>
      </section>
      <div className="agregar_view">
        <div className="agre">
			    <div class="info-text">
			      <h1 className="h1_agre">Agregar actividad</h1><br></br>
			    </div>
		    </div>
        <div className="con_agre">
            <h2 className="titlle_agre">LLena los datos de la actividad</h2>
            <div className="input-group">
                <form action="../../form-result.php" target="_blank">
    
                  <label for="name_act" className="label_agre">Nombre de la actividad:</label>
                  <input type="text" name="name_act" placeholder="Nombre de la actividad" id="name_act" className="input_agre"/>
                  <label for="codigo_act" className="label_agre">Codigó de la actividad:</label>
                  <input type="text" name="codigo_act" placeholder="Codigó de la actividad" id="codigo_act" className="input_agre"/>
                  <label for="año_act" className="label_agre">Año de Creación:</label>
                  <select id="año_act" name="Año" className="select_agre">
                    <option value="">Seleccione el año</option>
                    <option>2023</option>
                  </select>
                  <label for="Des_act" className="label_agre">Descripción de la actividad:</label>
                  <textarea className="text-area" cols="30s" rows="8"></textarea><br></br>
                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}><a className="btn_agre" type="button" id="btn_regis" onClick={Mostrar}>Agregar actividad</a></div>
                </form>
            </div>
                
        </div>
      </div>
      
    </div>
  );
};

export default Agregar;


