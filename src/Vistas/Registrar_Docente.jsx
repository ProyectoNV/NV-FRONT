import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Formularios.css';

export const Regis_Docente = () => {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
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
        const { name, value } = e.target;
        setInformacionDocente({ ...informacionDocente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/admin/registrar_Docente", informacionDocente);
            setInformacionDocente({
                tipoDoc: "",
                numeroId: "",
                nombres: "",
                apellidos: "",
                fechaNacimiento: "",
                genero: "",
                correo: "",
                celular: ""
            });
            console.log("Estado informacion", informacionDocente);
            Swal.fire("¡Docente registrado!", "El docente ha sido registrado correctamente.", "success");
        } catch (error) {
            console.error(`Error al enviar datos: ${error}`);
            Swal.fire("Error", "Ocurrió un error al enviar los datos. Por favor, inténtalo de nuevo.", "error");
        }

        if (informacionDocente.nombres.split(' ').length < 1 || informacionDocente.apellidos.split(' ').length < 2) {
            Swal.fire({
                title: "Caracteres insuficientes",
                text: "Por favor, ingresa los nombres completos.",
                icon: "error"
            });
            return;
        }
    };

    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="info-text">
			  <h1>Registro de Docentes</h1>
              <div>
                <form className="cont_info" onSubmit={handleSubmit}>
                    <legend className="info_title">Información Docente</legend>
                    <div className="info_form">
                        <div>
                            <label htmlFor="pname">Nombres</label>
                            <input id="pname" type="text" name="nombres" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="psurname">Apellidos</label>
                            <input id="psurname" type="text" name="apellidos" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="tdocument">Tipo de documento</label>
                            <input list="tdocument" name="tipoDoc"  onChange={handleChange} required/>
                            <datalist id="tdocument">
                                <option  value={"TI"}>T.I</option>
                                <option value={"CC"}>C.C</option>
                                <option value={"RC"}>R.C</option>
                                <option value={"CE"}>C.E</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="ndocument">Numero de documento</label>
                            <input id="document" type="text" name="numeroId" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="ncelular">Numero de celular</label>
                            <input id="celular" type="text" name="celular" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="email">Correo Electronico</label>
                            <input id="correo" type="email" name="correo" onChange={handleChange} required/>
                        </div>
                        <div>
                            <label htmlFor="date_nacimiento">Fecha de nacimiento</label>
                            <input id="fecha_nacimiento" type="date" name="fechaNacimiento" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-genero">
                        <p>Genero</p>
                        <div className="generos">
                            <input type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange}/>
                            <label htmlFor="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                        </div>
                        <div className="generos">
                            <input type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange}/>
                            <label htmlFor="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                        </div>
                    </div>
                    <div className="btn"><button className="button_formu" type="submit" id="btn_regis">Registrar</button></div>
                </form>
              </div>
			</div>
        </div>
    )
}

export default Regis_Docente