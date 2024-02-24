import React from "react"
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Formularios.css'
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import Swal from "sweetalert2";

export const Regis_alum = () => {

    const [validador, setValidador] = useState(false)

    var refModal = useRef();
    var refModal2 = useRef();

    const Mostrar = (e) => {
        if(validador==false){
            Swal.fire({
                text: "Algunos datos son invalidos"
            })
        }
        else if(datos.Nombre.length==0 || datos.Apellido.length==0 || datos.Num_Doc.length==0 || datos.Correo.length==0 || datos.Celular.length==0 || datos.Fecha.length==0){
            Swal.fire({
                text: "Formulario incompleto"
            })
        }else{
            const myrefValue = refModal.current;
            myrefValue.style.opacity= "1";
            myrefValue.style.pointerEvents= "inherit";
        }
        
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

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,10}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{8,25}$/, // 8 a 25 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        id: /^.{0,12}$/
    }

    var refnombre = useRef();
    var refapellido = useRef();
    var refcelular = useRef();
    var refcorreo = useRef();
    var reftipo = useRef();
    var refnumc = useRef();
    var reffecha = useRef();


    const [datos, setDatos] = useState({
        Nombre: '',
        Apellido: '',
        Tipo_Doc: '',
        Num_Doc: '',
        Correo: '',
        Celular: '',
        Fecha: '',
        Nombre_a: '',
        Apellido_a: '',
        Num_Doc_a: '',
        Correo_a: '',
    })


    function cambio (e) {
        switch (e.target.id) {
            case "pname":
                const myrefnombre = refnombre.current;
                setDatos((valores) => ({
                    ...valores,
                    Nombre : e.target.value,
                }))
                if(expresiones.nombre.test(datos.Nombre)){
                    myrefnombre.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefnombre.style.borderColor= ' #bb2929';
                    setValidador(false);
                }
            break;
            case "psurname":
                const myrefapellido = refapellido.current;
                setDatos((valores) => ({
                    ...valores,
                    Apellido : e.target.value,
                }))
                if(expresiones.nombre.test(datos.Apellido)){
                    myrefapellido.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefapellido.style.borderColor= ' #bb2929';
                    setValidador(false);
                }
            break;
            case "ncelular":
                const myrefcelular = refcelular.current;
                setDatos((valores) => ({
                    ...valores,
                    Celular : e.target.value,
                }))
                if(expresiones.telefono.test(datos.Celular)){
                    myrefcelular.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefcelular.style.borderColor= ' #bb2929';
                    setValidador(false);
                }
            break;
            case "email":
                const myrefcorreo = refcorreo.current;
                setDatos((valores) => ({
                    ...valores,
                    Correo : e.target.value,
                }))
                if(expresiones.correo.test(datos.Correo)){
                    myrefcorreo.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefcorreo.style.borderColor= ' #bb2929';
                    setValidador(false);
                }
            break;
            case "ndocument":
                const myrefnum = refnumc.current;
                setDatos((valores) => ({
                    ...valores,
                    Num_Doc : e.target.value,
                }))
                if(expresiones.id.test(datos.Num_Doc)){
                    myrefnum.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefnum.style.borderColor= ' #bb2929';
                    setValidador(false);
                }
            break;
            case "date_nacimiento":
                const myrefecha = reffecha.current;
                setDatos((valores) => ({
                    ...valores,
                    Fecha : e.target.value,
                }))
                if(datos.Fecha.length===0){
                    myrefecha.style.borderColor= '#1ed12d';
                    setValidador(true);
                }else{
                    myrefecha.style.borderColor= '#bb2929';
                    setValidador(false);
                }
            break;
            case "tdocument":
                const myreftipo = reftipo.current;
                setDatos((valores) => ({
                    ...valores,
                    Tipo_Doc : e.target.value,
                }))
                    myreftipo.style.borderColor= '#1ed12d';
                    setValidador(true);
            break;
        }
    }



    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de Registrar a esta persona</h2>
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
			  <h1>Registro de alumnos</h1>
              <div>
                <form className="cont_info">
                    <legend className="info_title">Información Alumno</legend>
                    <div className="info_form">
                        <div>
                            <label for="pname">Nombres</label>
                            <input id="pname" type="text" name="p_nombre" ref={refnombre} onChange={cambio}/>
                        </div>
                        <div>
                            <label for="psurname">Apellidos</label>
                            <input id="psurname" type="text" name="p_apellido" ref={refapellido} onChange={cambio}/>
                        </div>
                        <div>
                            <label for="tdocument">Tipo de documento</label>
                            <input list="tdocument"  ref={reftipo}/>
                            <datalist id="tdocument" onChange={cambio}>
                                <option selected>T.I</option>
                                <option>C.C</option>
                                <option>R.C</option>
                                <option>C.E</option>
                            </datalist>
                        </div>
                        <div>
                            <label for="ndocument">Numero de documento</label>
                            <input id="ndocument" type="text" name="ndocument" ref={refnumc} onChange={cambio}/>
                        </div>
                        <div>
                            <label for="ncelular">Numero de celular</label>
                            <input id="ncelular" type="text" name="ncelular" ref={refcelular} onChange={cambio}/>
                        </div>
                        <div>
                            <label for="email">Correo Electronico</label>
                            <input id="email" type="email" name="email" ref={refcorreo} onChange={cambio}/>
                        </div>
                        <div>
                            <label for="date_nacimiento">Fecha de nacimiento</label>
                            <input id="date_nacimiento" type="date" name="date_nacimiento" ref={reffecha} onChange={cambio}/>
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
                </form>
              </div>
              <div>
                <form className="cont_info">
                    <legend className="info_title">Información Acudiente</legend>
                    <div className="info_form">
                        <div>
                            <label for="pname-a">Nombres</label>
                            <input id="pname-a" type="text" name="p_nombre-a"/>
                        </div>
                        <div>
                            <label for="psurname-a">Apellidos</label>
                            <input id="psurname-a" type="text" name="p_apellido-a"/>
                        </div>
                        <div>
                            <label for="ncelular">Numero de celular</label>
                            <input id="ncelular" type="text" name="ncelular"/>
                        </div>
                        <div>
                            <label for="email">Correo Electronico</label>
                            <input id="email" type="email" name="email"/>
                        </div>
                        <div>
                            <label for="date_nacimiento">Fecha de nacimiento</label>
                            <input id="date_nacimiento" type="date" name="date_nacimiento"/>
                        </div>
                    </div>
                    <div class="btn"><a className="button_formu" type="submit" id="btn_regis" onClick={Mostrar}>Registrar</a></div>
                </form>
              </div>
			</div>
        </div>
    )
}

export default Regis_alum