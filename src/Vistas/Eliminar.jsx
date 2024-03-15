import React from "react";
import { useState, useRef, useEffect} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Lista_pro.css';


export const Eliminar = () => {

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
// funcion get
    const [listUpdated, setListUpdated] = useState(false)
    const [actuaEstado, setActuaEstado] = useState ([])
    const [actuaEstadoi, setActuaEstadoi] = useState ([])
    
    useEffect(() => {
        const actuaactividad = async () => {
            try{
                const getActualizar = await fetch('http://localhost:4000/actividades/mostrar');
                const dataActualizar= await getActualizar.json();
                setActuaEstado(dataActualizar);
                console.log(dataActualizar);
            }catch(error){
                console.log(error);
            }       
        }
        const actuaactividadI = async () => {
            try{
                const getActui = await fetch('http://localhost:4000/actividades/mostrarInactivas');
                const dataActui= await getActui.json();
                setActuaEstadoi(dataActui);
                console.log(dataActui);
            }catch(error){
                console.log(error);
            }       
        }
        actuaactividad()
        actuaactividadI()
        setListUpdated(false);
    }, [listUpdated])

//Funcion put

    const actualizarActividad = async (e) => {
        let estadoAct = e.target.id
        try {
            const response = await fetch('http://localhost:4000/actividades/actualizaract/'+ estadoAct, {
            method: 'PUT',
        });
  
        if (response.ok) {
            console.log('La actividad actualizo exitosamente');
      
        }
        } catch (error) {
            console.error('Error al actualizar la activida', error.message);
        }setListUpdated(true)
    };


    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de eliminar esta actividad</h2>
                    <p className="modal_paragraph">Una vez eliminada esta actividad no habra la posivilidad de inscribirse</p>
                    <div className="content_modal_b">
                        <a href="#" className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" className="modal_close_actu" id="Regis" onClick={actualizarActividad}>Eliminar</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label htmlFor="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La actividad ha sido eliminada</p>
                </div>
            </section>
            <div className="cont_card">
                <h1>Actividades Actuales Activas</h1><br></br>
                <div className="cont_eliminar">
                    {actuaEstado.map((actua) => {
                        return (
                            <div className="card_d" key={actua.id_actividad}>
                                <figure style={{backgroundColor:('#8b0fff')}}>
                                    <img src={require(`../Imagenes/Biblioteca_Imagenes/${actua.foto}.png`)}/>
                                </figure>
                                <div className="contenido">
                                    <h3>{actua.Nombre_actividad} </h3>
                                    <p>{actua.descripcion} </p>
                                    <a id={actua.id_actividad} onClick={actualizarActividad}>Desactivar actividad</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="cont_card">
                <h1>Actividades Actuales Inactivas</h1><br></br>
                <div className="cont_eliminar">
                    {actuaEstadoi.map((actuai) => {
                        return (
                            <div className="card_d" key={actuai.id_actividad}>
                                <figure style={{backgroundColor:('#fcb900')}}>
                                    <img src={require(`../Imagenes/Biblioteca_Imagenes/${actuai.foto}.png`)}/>
                                </figure>
                                <div className="contenido">
                                    <h3>{actuai.Nombre_actividad} </h3>
                                    <p>{actuai.descripcion} </p>
                                    <a id={actuai.id_actividad} onClick={actualizarActividad}>Activar actividad</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div> 
        
    )
}

export default Eliminar;
