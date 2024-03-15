import React, { useState, useRef } from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Buscar from "../Imagenes/iconos/bx-search.svg";
import '../css/Formularios.css';
import Swal from "sweetalert2";
import axios from "axios";

export const Historial_user = () => {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }

    // Estado para almacenar los datos del alumno
    const [Historial, setHistorial] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        celular: '',
        estado:'',
        nombre_acudiente: '',
        correo_acudiente: '',
        celular_acudiente: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        
        const { name, value } = e.target;

        // Validación para el campo "numero_id", "celular" y "celular_acudiente" (solo números)
        if (name === 'numero_id' || name === 'celular' || name === 'celular_acudiente') {
            // Si el valor no es vacío y no contiene solo números, no se actualiza el estado
            if (value !== '' && !/^\d+$/.test(value)) {
                return;
            }
        }

        // Validación para los campos que no deben contener números
        if (name === 'Nombres' || name === 'Apellidos' || name === 'nombre_acudiente' || name === 'apellido_acudiente') {
            // Si el valor contiene números, no se actualiza el estado
            if (/\d/.test(value)) {
                return;
            }
        }
        setHistorial({ ...Historial, [e.target.name]: e.target.value });
    };

    // Función para enviar los datos actualizados del alumno al servidor
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Historial.Nombres || !Historial.Apellidos || !Historial.correo || !Historial.celular || !Historial.fecha_nacimiento || !Historial.contrasena || !Historial.genero || !Historial.nombre_acudiente || !Historial.correo_acudiente) {
            Swal.fire({
                title: "Campos requeridos",
                text: "Por favor, completa todos los campos.",
                icon: "error"
            });
            return;
        }
        if (Historial.numero_id.length < 7) {
            Swal.fire({
                title: "Número de identificación inválido",
                text: "El número de identificación debe tener al menos 7 caracteres.",
                icon: "error"
            });
            return;
        }


        try {
            console.log(Historial)
            Historial.fecha_nacimiento = Historial.fecha_nacimiento.split('T')[0]
            console.log(Historial)
            const respuesta = await axios.put(`http://localhost:4000/alumno/actualizaralumno`, Historial);
            if (respuesta.status === 200) {

                setHistorial(
                    {
                        pkfk_tdoc: '',
                        numero_id: '',
                        Nombres: '',
                        Apellidos: '',
                        fecha_nacimiento: '',
                        genero: '',
                        correo: '',
                        celular: '',
                        estado:'',
                        nombre_acudiente: '',
                        correo_acudiente: '',
                        celular_acudiente: ''
                    }

                )
                Swal.fire({
                    text: "Actualización exitosa",
                    icon: "success"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al actualizar alumno",
                icon: "error"
            });
            console.error(`Error al actualizar alumno, ${error}`);
        }
    };

    const handleEstado = async ()=>{
        try {
        {/**si el estado es igual a 0 entonces cambia a 1 y si es 1 cambia a 0 */}
            const respuesta = await axios.put(`http://localhost:4000/alumno/actualizarestado/${Historial.numero_id}`,
             {estado: (Historial.estado) === 0 ? 1 : 0 });
            if (respuesta.status === 200) {

                setHistorial(
                    {
                        pkfk_tdoc: '',
                        numero_id: '',
                        Nombres: '',
                        Apellidos: '',
                        fecha_nacimiento: '',
                        genero: '',
                        correo: '',
                        celular: '',
                        estado:'',
                        nombre_acudiente: '',
                        correo_acudiente: '',
                        celular_acudiente: ''
                    }

                )
                Swal.fire({
                    text: "Actualización exitosa",
                    icon: "success"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al actualizar alumno",
                icon: "error"
            });
            console.error(`Error al actualizar alumno, ${error}`);
        }

    }

    // Función para buscar los datos del alumno en el servidor basado en el número de identificación ingresado
    const handleBuscar = async () => {
        try {
            const respuesta = await axios.get(`http://localhost:4000/alumno/consulta/${Historial.numero_id}`);
            if (respuesta.status === 200) {
                setHistorial(respuesta.data);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se encontraron datos para el alumno",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al obtener datos del alumno",
                icon: "error"
            });
            console.error(`Error al obtener datos del alumno, ${error}`);
        }
    };


    return (
        <div className={`${showe ? 'space-toggle': null}}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <div className="info-text">
                <h1>Historial de Usuario</h1>
                <div className="buscar">
                    <input type="text" onChange={handleChange} value={Historial.numero_id} name="numero_id" placeholder="Ingrese número de documento del estudiante" required />
                    <div className="buscar_icon" onClick={handleBuscar}>
                        <i><img src={Buscar} alt="Buscar" /></i>
                    </div>
                </div><br />
                <div>
                    <h3 className="h3_formu">Datos Básicos</h3>
                </div>
                <div>
                    <form className="cont_info" onSubmit={handleSubmit}>
                        <legend className="info_title">Información Alumno</legend>
                        <div className="info_form">
                            <div>
                                <label htmlFor="pname">Nombres</label>
                                <input id="pname" type="text" name="Nombres" value={Historial.Nombres} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="psurname">Apellidos</label>
                                <input id="psurname" type="text" name="Apellidos" value={Historial.Apellidos} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="tdocument">Tipo de documento</label>
                                <input list="tdocument" name="pkfk_tdoc" value={Historial.pkfk_tdoc} onChange={handleChange} />
                                <datalist id="tdocument">
                                    <option value="TI">T.I</option>
                                    <option value="CC">C.C</option>
                                    <option value="RC"> R.C</option>
                                    <option value="CE">C.E</option>
                                </datalist>
                            </div>

                            <div>
                                <label htmlFor="ndocument">Numero de documento</label>
                                <input id="ndocument" type="text" name="numero_id" value={Historial.numero_id} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ncelular">Numero de celular</label>
                                <input id="ncelular" type="text" name="celular" value={Historial.celular} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Correo Electronico</label>
                                <input id="email" type="email" name="correo" value={Historial.correo} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="date_nacimiento">Fecha de nacimiento</label>
                                <input id="fecha_nacimiento" type="date" name="fecha_nacimiento" value={Historial.fecha_nacimiento.split('T')[0]} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Genero</p>
                            <div className="generos" >
                                <input checked={Historial.genero === 'masculino'} type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange} />
                                <label htmlFor="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input checked={Historial.genero === 'femenino'} type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange} />
                                <label htmlFor="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                            </div>
                        </div>


                        {/* Informacion Acudiente */}
                        <div>
                            {/* <form className="cont_info" > */}
                            <legend className="info_title">Información Acudiente</legend>
                            <div className="info_form">
                                <div>
                                    <label htmlFor="pname-a">Nombre acudiente</label>
                                    <input id="pname-a" type="text" name="nombre_acudiente" value={Historial.nombre_acudiente} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="email-a">Correo Electronico</label>
                                    <input id="email-a" type="email" name="correo_acudiente" value={Historial.correo_acudiente} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="ncelular-a">Numero de celular</label>
                                    <input id="ncelular-a" type="text" name="celular_acudiente" value={Historial.celular_acudiente} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="esta">Estado</label>
                                    {/**Si el estado es igual a 0 tomara el primer valor que es inactivo de lo contrario tomara que es activo */}
                                    <input id="estados" type="text" name="estado" value={Historial.estado === 0 ? 'inactivo': 'activo'} onChange={handleChange} readOnly/>
                                </div>

                            </div>
                            <div className="botones">
                                <div className="btn marginboton"><button className="button_formu" type="submit" >Actualizar</button></div>
                                <div className="btn"><input type="button" className="button_formu" onClick={handleEstado} value="Cambiar estado "></input></div>
                            </div>
                        </div>

                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Historial_user