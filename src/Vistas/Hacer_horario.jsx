import react, { useState, useRef, useEffect} from "react"
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Swal from "sweetalert2";
import '../css/cronograma.css'

export const Hacer_crono = () => {
    //Funciones que se encargan de mostrar y oculra los modales de confirmacion
    var refModal = useRef();
    var refModal2 = useRef();
    var refModal3 = useRef();
    var reflugar = useRef();
    var refhoraF = useRef();
    var refhoraI = useRef();

    //Expresiones regulares para los inputs
    const expresiones = {
        hora: /^(0[6-9]|1[0-7]):[0-5][0-9]:[0-5][0-9]$/, 
        lugar: /^\S+$/
    }

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
    const Mostrar3 = (e) => {
        const myrefValue = refModal3.current;
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
        const myrefocultar3 = refModal3.current;
        myrefocultar3.style.opacity= "0";
        myrefocultar3.style.pointerEvents= "none";
    }

    //funcion que maneja el estado del sidebar
    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}

    //Agrego peticiones
    //Variables de estado
    const [activities, setActivities] = useState([]);
    const [horarioactivies, setHorarioactivies] = useState([]);
    const [listUpdated, setListUpdated] = useState(false);
    const [validadorlugar, setValidadorlugar] = useState(true);
    const [validadorhoraI, setValidadorhoraI] = useState(true);
    const [validadorhoraF, setValidadorhoraF] = useState(true);
    const [actualihorario, setActualihorario]=useState({
        estadoActu: "",
        infoActu: ""
    })

    const changeActualizarHorario=(e)=>{
        const {name,value}=e.target;
        setActualihorario({...actualihorario,[name]:value})

    }
    //Renderisado con UseEffect
    useEffect(() => {
        const optionsacti = async () => {
            try{
                const getacti = await fetch('http://localhost:4000/actividades/mostrar');
                const dataacti = await getacti.json();
                setActivities(dataacti);
                console.log(dataacti);
            }catch(error){
                console.log(error);
            }
        }
        const optionsactihorario = async () => {
            try{
                const getactihorario = await fetch('http://localhost:4000/horario/filtroHorarios');
                const dataactihorario = await getactihorario.json();
                setHorarioactivies(dataactihorario);
                console.log(dataactihorario);
            }catch(error){
                console.log(error);
            }
        }
        optionsacti()
        optionsactihorario()
        setListUpdated(false);
    }, [listUpdated])

    //Varibles de estado contenedoras
    const [horario, setHorario]=useState({
        Dia_semana: "",
        Hora_inicio: "",
        Hora_fin: "",
        Lugar: "",
        estado: 1
    })

    const [horarioActividad, setHorarioActividad]=useState({
        id_actividad: "",
        horario_id : ""
    })

    // Validacion de cambio de los inputs

    //Funciones que controlan y guardan el cambio de valores de los inputs
    const changeregisHoario=(e)=>{
        const {name,value}=e.target;
        setHorario({...horario,[name]:value})
        const {id}=e.target;
        switch (id) {
            case "lugar":
                const myreflugar = reflugar.current;
                if(expresiones.lugar.test(horario.Lugar)){
                    myreflugar.style.opacity= '0';
                    setValidadorlugar(true);
                }else{
                    myreflugar.style.opacity= '1';
                    setValidadorlugar(false);
                }
            break;
            case "hinicio":
                const myrefhoraI = refhoraI.current;
                if(expresiones.hora.test(horario.Hora_inicio)){
                    myrefhoraI.style.opacity= '0';
                    setValidadorhoraI(true);
                }else{
                    myrefhoraI.style.opacity= '1';
                    setValidadorhoraI(false);
                }
            break;
            case "hfinal":
                const myrefhoraF = refhoraF.current;
                if(expresiones.hora.test(horario.Hora_fin)){
                    myrefhoraF.style.opacity= '0';
                    setValidadorhoraF(true);
                }else{
                    myrefhoraF.style.opacity= '1';
                    setValidadorhoraF(false);
                }
            break;
        }
    }

    const changeregisHorarioActividad=(e)=>{
        const {name,value}=e.target;
        setHorarioActividad({...horarioActividad,[name]:value})

    }

    //Funciones que validan las horas
    const validarHoras = async ()=>{
        let parametro1 = `/${horario.Dia_semana}`;
        let condicion1=true
        let validar = 0
        try{
            const po = await fetch('http://localhost:4000/horario/buscarHorarios/'+horario.Lugar+parametro1);
            const pe = await po.json();
            console.log(pe);
            let separhorainicioinput = horario.Hora_inicio.split(":")
            let separhorafininput = horario.Hora_fin.split(":")
            for(let i=0; i<pe.length; i++){
                let separhorainicio = pe[i].Hora_inicio.split(":");
                let separhorafin = pe[i].Hora_fin.split(":");
                if(separhorafininput[0] > separhorainicio[0] && separhorainicioinput[0] < separhorafin[0]){
                    condicion1 = false
                    validar++
                }
                else if(separhorafininput[0] == separhorainicio[0]){
                    if(separhorafininput[1] > separhorainicio[1]){
                        condicion1 = false
                        validar++
                    }
                    else{
                        condicion1 = true
                        console.log("funciona")
                    }
                }
                else if(separhorainicioinput[0] == separhorafin[0]){
                    if(separhorainicioinput[1] < separhorafin[1]){
                        condicion1 = false
                        validar++
                    }
                    else{
                        condicion1 = true
                        console.log("funciona")
                    }
                }
                else{
                    condicion1 = true
                }
                console.log(condicion1)
                console.log(validar)
            }
        }catch(error){
            console.log(error);
        }
        console.log(validar)
        return(validar)
    }
    
    //Funciones post peticion a API
    const horarioSubmit=async (e)=>{
        e.preventDefault();
        console.log(horario)
        let resvali = await validarHoras();
        console.log(resvali);
        let{Dia_semana, Hora_inicio, Hora_fin, Lugar} = horario
        if(Dia_semana=="" || Hora_inicio=="" || Hora_fin=="" || Lugar==""){
            Swal.fire({
                text: "Todos los campos son obligatorios"
            })
            Ocultar();
        }
        else if(resvali >= 1){
            Swal.fire({
                text: "Este horario se cruza con otro ya existente"
            })
            Ocultar();
        }
        else if(validadorlugar == false || validadorhoraI== false || validadorhoraF== false){
            Swal.fire({
                text: "Algunos campos no son validos"
            })
            Ocultar();
        }
        else{
            try {
                console.log(horario)
                const response = await fetch("http://localhost:4000/horario/agregarHorarios",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(horario)
            });

            
            if(response.ok){
                Mostrar2();
            }else{
                throw new Error("Error al agregar horario")
            }


            }catch (error) {
                console.error("Error al agregar horario: ",error)
            }
        }
        
        setListUpdated(true)
    }

    const EliminarHorarioSubmit=async (e)=>{
        e.preventDefault();
        try {
            const responseactu = await fetch("http://localhost:4000/horario/eliminarHorario/"+actualihorario.estadoActu,{
                method: 'DELETE'
            });

        
            if(responseactu.ok){
                Mostrar2();
            }else{
                throw new Error("Error eliminar")
            }

        }catch (error) {
            console.error("Error al eliminar horario: ",error)
        }

        setListUpdated(true)
    }

    const ActualizarhorarioSubmit=async (e)=>{
        e.preventDefault();
        console.log(horario)
        let resvali = await validarHoras();
        console.log(resvali);
        let{Dia_semana, Hora_inicio, Hora_fin, Lugar} = horario
        if(Dia_semana=="" || Hora_inicio=="" || Hora_fin=="" || Lugar=="" || actualihorario.infoActu==""){
            Swal.fire({
                text: "Todos los campos son obligatorios"
            })
            Ocultar();
        }
        else if(resvali >= 1){
            Swal.fire({
                text: "Este horario se cruza con otro ya existente"
            })
            Ocultar();
        }
        else if(validadorlugar == false || validadorhoraI== false || validadorhoraF== false){
            Swal.fire({
                text: "Algunos campos no son validos"
            })
            Ocultar();
        }
        else{
            try {
                const responseactu = await fetch("http://localhost:4000/horario/actualizarHorario/"+actualihorario.infoActu,{
                method:"PUT",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(horario)
            });

            
            if(responseactu.ok){
                Mostrar2();
            }else{
                throw new Error("Error actualizando horario")
            }

            }catch (error) {
                console.error("Error al agregar horario: ",error)
            }
        }
        
        setListUpdated(true)
    }

    const horarioactividadSubmit=async (e)=>{
        e.preventDefault();
        console.log(horarioActividad)
        try {
            const response = await fetch("http://localhost:4000/horario/agregarHorariosActividad",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(horarioActividad)
            });

            
            if(response.ok){
                Mostrar2();
            }else{
                throw new Error("Error al agregar horario")
            }

        } catch (error) {
            console.error("Error al agregar horario: ",error)

        }
        setListUpdated(true)
    }

    //Renderizado de Alertas Modal y  formulario
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de Agregar esta nueva opcion de horario?</h2>
                    <p className="modal_paragraph">Una vez se agregue el horario se podra visualizar en las opciones</p>
                    <form onSubmit={horarioSubmit} className="content_modal_b">
                        <a className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <button type="submit" className="modal_close_actu" id="Regis">Agregar</button>
                    </form>
                </div>
            </section>
            <section className="modal_regis-d" ref={refModal3}>
                <div className="modal_container">
                    <img src={Verifi} className="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de Agregar al horario este espacio?</h2>
                    <p className="modal_paragraph">Una vez se agregue el horario se podra visualizar en el cronograma de actividades</p>
                    <form onSubmit={horarioactividadSubmit} className="content_modal_b">
                        <a className="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <button type="submit" className="modal_close_actu" id="Regis">Agregar</button>
                    </form>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label htmlFor="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">Accion realizada con exito</p>
                </div>
            </section>
            <div className="info-text">
			  <h1>Cronograma de actividades</h1>
              <div>
                <form className="form_crono">
                    <legend className="crono_title">Asigna un horario</legend>
                    <div className="info_crono">
                        <div className="input_horario_select">
                            <p style={{ height: "50px"}}>Seleccione el dia de la semana</p>
                            <select value={horario.Dia_semana} onChange={changeregisHoario} name="Dia_semana" id="opcion_dia">
                                <option value=""></option>
                                <option value="lunes">Lunes</option>
                                <option value="martes">Martes</option>
                                <option value="miercoles">Miercoles</option>
                                <option value="jueves">Jueves</option>
                                <option value="viernes">Viernes</option>
                                <option value="sabado">Sabado</option>
                            </select>
                        </div>
                        <div  className="input_horario">
                            <label htmlFor="lugar">Ingrese el lugar</label>
                            <input value={horario.Lugar} onChange={changeregisHoario} id="lugar" type="text" name="Lugar"/>
                            <p ref={reflugar}>Ingrese el lugar sin espacios</p>
                        </div>
                        <div  className="input_horario">
                            <label htmlFor="hinicio">Ingrese la hora de inicio</label>
                            <input value={horario.Hora_inicio} onChange={changeregisHoario} id="hinicio" type="text" name="Hora_inicio"/>
                            <p ref={refhoraI}>Ingrese el valor en formato 24 horas HH:MM:SS</p>
                        </div>
                        <div  className="input_horario">
                            <label htmlFor="hfinal">Ingrese la hora en la que finaliza</label>
                            <input value={horario.Hora_fin} onChange={changeregisHoario} id="hfinal" type="text" name="Hora_fin"/>
                            <p ref={refhoraF}>Ingrese el valor en formato 24 horas HH:MM:SS</p>
                        </div>
                    </div>
                    <div className="btn"><a className="button_cronograma" type="submit" id="btn_crono" onClick={Mostrar}>Agregar a horario</a></div>
                </form>
                <form className="form_crono">
                    <legend className="crono_title">Asigna un horario a Actividad</legend>
                    <div className="info_crono">
                        <div>
                            <p>La actividad correspondiente</p> 
                            <select onChange={changeregisHorarioActividad} name="id_actividad" id="opcion_actividad">
                                <option value=""></option>
                                {activities.map((activity) => (
                                        <option key={activity.id_actividad} value={activity.id_actividad}>{activity.Nombre_actividad}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>Ingrese el horario correspondiente</p> 
                            <select onChange={changeregisHorarioActividad} name="horario_id" id="opcion_actividad_horario">
                                <option value=""></option>
                                {horarioactivies.map((actihorario) => (
                                        <option key={actihorario.id_horario} value={actihorario.id_horario}>{`Dia: ${actihorario.Dia_semana}/ HI: ${actihorario.Hora_inicio}/ HF: ${actihorario.Hora_fin}/ lugar: ${actihorario.Lugar}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="btn"><a className="button_cronograma" type="submit" id="btn_crono" onClick={Mostrar3}>Agregar horario a actividad</a></div>
                </form>
                <div className="form_crono">
                    <legend className="crono_title">modificar horarios</legend>
                    <div className="info_crono">
                        <form onSubmit={EliminarHorarioSubmit}>
                            <p>Cambiar estado de horario</p> 
                            <select onChange={changeActualizarHorario} name="estadoActu" id="opcion_actividad">
                                <option value=""></option>
                                {horarioactivies.map((listE) => (
                                    <option key={listE.id_horario} value={listE.id_horario}>{`Dia: ${listE.Dia_semana}/ HI: ${listE.Hora_inicio}/ HF: ${listE.Hora_fin}/ lugar: ${listE.Lugar}`}</option>
                                ))}
                            </select>
                            <div className="btn"><button className="button_cronograma" type="submit" id="btn_crono">Eliminar</button></div>
                        </form>
                        <form onSubmit={ActualizarhorarioSubmit}>
                            <p>Actualizar Información de un horario</p> 
                            <select onChange={changeActualizarHorario} name="infoActu" id="opcion_actividad_horario">
                                <option value=""></option>
                                {horarioactivies.map((listH) => (
                                    <option key={listH.id_horario} value={listH.id_horario}>{`Dia: ${listH.Dia_semana}/ HI: ${listH.Hora_inicio}/ HF: ${listH.Hora_fin}/ lugar: ${listH.Lugar}`}</option>
                                ))}
                            </select>
                            <div className="btn"><button className="button_cronograma" type="submit" id="btn_crono">Actualizar</button></div>
                        </form>
                    </div>
                </div>
              </div>
			</div>
        </div>
    )
}

export default Hacer_crono