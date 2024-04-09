import React from "react";
import { useState, useRef, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
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

    const iduser = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).id;
    const [alumnoActividad, setAlumnoActividad]=useState({
        Actividad_id: "",
        id_alumno: iduser
    })
    const [listUpdated, setListUpdated] = useState(false)
    const [listActu, setListActu] = useState ([])
    
    useEffect(() => {
        const Actividadlist = async () => {
            try{
                const respuesta = await axios.get('http://localhost:4000/actividades/mostrar');
                setListActu(respuesta.data);
            }catch(error){
                console.log(error);
            }       
        }
        Actividadlist()
        setListUpdated(false);
    }, [listUpdated])


    const changeActivity = async (acti_id) => {
        console.log(acti_id)
        const hacer = await setAlumnoActividad({
            Actividad_id: acti_id,
            id_alumno: iduser
        });
        Mostrar();
        console.log(alumnoActividad)
    }

    const ContarAlumnos = async ()=>{
        try{
            const conteo = await fetch('http://localhost:4000/actividades/BuscarAlumnosActi/'+alumnoActividad.Actividad_id);    
            const resultcon = await conteo.json();
            return(resultcon[0].cantidad_alumnos);
        }catch(error){
            console.log(error);
        }
    }

    const Contaractividades = async ()=>{
        let fechaactual = new Date();
        let parametro1 = `/${fechaactual.getFullYear()}`;
        try{
            const conteoacty = await fetch('http://localhost:4000/actividades/BuscarActividadesAlumno/'+iduser+parametro1);    
            const resultconacty = await conteoacty.json();
            return(resultconacty[0].cantidad_actividades);
        }catch(error){
            console.log(error);
        }
    }

    const alumactividadSubmit=async (e)=>{
        e.preventDefault();
        let convali = await ContarAlumnos();
        let activali = await Contaractividades();
        if(convali>=20){
            Swal.fire({
                title: "Lo sentimos",
                text: "Esta actividad ya se encuentra al limite de cupos",
                icon: "error"
            });
            Ocultar();
        }
        else if(activali>=5){
            Swal.fire({
                title: "Lo sentimos",
                text: "Ya formas parte de 5 actividades actualmente",
                icon: "error"
            });
            Ocultar();
        }
        else{
            try {
                const response = await fetch("http://localhost:4000/actividades/inscribirse",{
                    method:"POST",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body: JSON.stringify(alumnoActividad)
                });
                if(response.ok){
                    Mostrar2();
                }else{
                    throw new Error("Error al asignar actividad")
                }

            } catch (error) {
                console.error("Error al asignar actividad: ",error)
            }
        }
        
        setListUpdated(true)
    }

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAlum Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de inscribirte a esta actividad?</h2>
                    <p className="modal_paragraph">Una vez aceptes se enviara la solicitud para inscribirse</p>
                    <form onSubmit={alumactividadSubmit} className="content_modal_b">
                        <a className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <button type="submit" className="modal_close_actu" id="Regis">Inscribir</button>
                    </form>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label htmlFor="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La solicitud se ha enviado con exito</p>
                </div>
            </section>
            <div className="cont_card">
                <h1> Inscribirse actividades</h1>
                <div className="cont_eliminar">
                    {listActu.map((act) => {
                        return (
                            <div className="card_d" key={act.id_actividad}>
                                <figure style={{backgroundColor:('#fcb900')}}>
                                    <img src={require(`../Imagenes/Biblioteca_Imagenes/${act.foto}.png`)}/>
                                </figure>
                                <div className="contenido">
                                    <h3>{act.Nombre_actividad} </h3>
                                    <p>{act.descripcion} </p>
                                    <a id={act.id_actividad} onClick={() => changeActivity(act.id_actividad)}>Inscribirse actividad</a>
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
