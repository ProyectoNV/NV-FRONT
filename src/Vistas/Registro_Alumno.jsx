import React, { useState, useRef, useEffect } from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import '../css/Formularios.css';
import Swal from "sweetalert2";
import '../css/Lista.css';
import axios from "axios";

export const Regis_alum = () => {
    const refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = () => {
        setShowe(!showe);
    };

    const [alumnos, setAlumnos] = useState({
        pkfk_tdoc: '',
        numero_id: '',
        Nombres: '',
        Apellidos: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        celular: '',
        contrasena: '',
        nombre_acudiente: '',
        correo_acudiente: '',
        celular_acudiente: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numero_id' || name === 'celular' || name === 'celular_acudiente') {
            if (value !== '' && !/^\d+$/.test(value)) {
                return;
            }
        }

        if (name === 'Nombres' || name === 'Apellidos' || name === 'nombre_acudiente') {
            if (/\d/.test(value)) {
                return;
            }
        }

        setAlumnos(prevAlumnos => ({
            ...prevAlumnos,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingStudent = lisalumno.find(student => student.numero_id === alumnos.numero_id);
        if (existingStudent) {
            Swal.fire({
                title: "Número de identificación duplicado",
                text: "El número de identificación ingresado ya está registrado.",
                icon: "error"
            });
            return;
        }

        if (!alumnos.Nombres || !alumnos.Apellidos || !alumnos.correo || !alumnos.celular || !alumnos.fecha_nacimiento || !alumnos.contrasena || !alumnos.genero || !alumnos.nombre_acudiente || !alumnos.correo_acudiente) {
            Swal.fire({
                title: "Campos requeridos",
                text: "Por favor, completa todos los campos.",
                icon: "error"
            });
            return;
        }

        if (alumnos.Nombres.split(" ").length < 1 || alumnos.Apellidos.split(" ").length < 2 || alumnos.nombre_acudiente.split(" ").length < 3) {
            Swal.fire({
                title: "Caracteres insuficientes",
                text: "Por favor, ingresa los nombres completos.",
                icon: "error"
            });
            return;
        }

        if (alumnos.numero_id.length < 7) {
            Swal.fire({
                title: "Número de identificación inválido",
                text: "El número de identificación debe tener al menos 7 caracteres.",
                icon: "error"
            });
            return;
        }

        try {
            const respuesta = await axios.post("http://localhost:4000/alumno/registraralumno", alumnos);
            if (respuesta.status === 200) {
                setAlumnos({
                    pkfk_tdoc: '',
                    numero_id: '',
                    Nombres: '',
                    Apellidos: '',
                    fecha_nacimiento: '',
                    genero: '',
                    correo: '',
                    celular: '',
                    contrasena: '',
                    nombre_acudiente: '',
                    correo_acudiente: '',
                    celular_acudiente: ''
                });

                setActualizartabla(!actualizartabla);
                Swal.fire({
                    text: "Registro exitoso",
                    icon: "success"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al registrar alumno",
                icon: "error"
            });
            console.error(`Error al registrar alumno: ${error}`);
        }
    };

    const [lisalumno, setlisalumno] = useState([]);
    const [actualizartabla, setActualizartabla] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/alumno/datos')
            .then(response => {
                setlisalumno(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [actualizartabla]);

    return (
        <div className={`contenert ${showe ? 'space-toggle' : ''}`} ref={refmove}>
            <SidebarAdmi Move={move_conte} />
            <div className="info-text">
                <h1>Registro de alumnos</h1>
                <div>
                    <form className="cont_info" onSubmit={handleSubmit}>
                        <legend className="info_title">Información Alumno</legend>
                        <div className="info_form">
                            <div>
                                <label htmlFor="pname">Nombres</label>
                                <input id="pname" type="text" name="Nombres" value={alumnos.Nombres} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="psurname">Apellidos</label>
                                <input id="psurname" type="text" name="Apellidos" value={alumnos.Apellidos} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="tdocument">Tipo de documento</label>
                                <input id="tdocument" list="tdocument-list" name="pkfk_tdoc" value={alumnos.pkfk_tdoc} onChange={handleChange} />
                                <datalist id="tdocument-list">
                                    <option value="TI">T.I</option>
                                    <option value="CC">C.C</option>
                                    <option value="RC">R.C</option>
                                    <option value="CE">C.E</option>
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="ndocument">Número de documento</label>
                                <input id="ndocument" type="text" name="numero_id" value={alumnos.numero_id} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ncelular">Número de celular</label>
                                <input id="ncelular" type="text" name="celular" value={alumnos.celular} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Correo Electrónico</label>
                                <input id="email" type="email" name="correo" value={alumnos.correo} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="date_nacimiento">Fecha de nacimiento</label>
                                <input id="date_nacimiento" type="date" name="fecha_nacimiento" value={alumnos.fecha_nacimiento} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="contrasena">Contraseña</label>
                                <input id="contrasena" type="text" name="contrasena" value={alumnos.contrasena} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-genero">
                            <p>Género</p>
                            <div className="generos">
                                <input type="radio" name="genero" id="optionsRadios1" value="masculino" onChange={handleChange} />
                                <label htmlFor="optionsRadios1"><span className="radio-button"></span>Masculino</label>
                            </div>
                            <div className="generos">
                                <input type="radio" name="genero" id="optionsRadios2" value="femenino" onChange={handleChange} />
                                <label htmlFor="optionsRadios2"><span className="radio-button"></span>Femenino</label>
                            </div>
                        </div>
                        <legend className="info_title">Información Acudiente</legend>
                        <div className="info_form">
                            <div>
                                <label htmlFor="pname-a">Nombre acudiente</label>
                                <input id="pname-a" type="text" name="nombre_acudiente" value={alumnos.nombre_acudiente} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email-a">Correo Electrónico</label>
                                <input id="email-a" type="email" name="correo_acudiente" value={alumnos.correo_acudiente} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="ncelular-a">Número de celular</label>
                                <input id="ncelular-a" type="text" name="celular_acudiente" value={alumnos.celular_acudiente} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="btn">
                            <button className="button_formu" type="submit">Registrar</button>
                        </div>
                    </form>
                    <div style={{ width: '100%' }}>
                        <h1 style={{ textAlign: 'center' }}>Listado de Estudiantes</h1>
                        <br />
                        <div className="container">
                            <table className='table_lista'>
                                <thead className='thead_lista'>
                                    <tr>
                                        <th>N°</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Fecha de nacimiento</th>
                                        <th>Celular</th>
                                        <th>Correo</th>
                                    </tr>
                                </thead>
                                <tbody className='body_lista'>
                                    {lisalumno.map((alumno, index) => (
                                        <tr key={alumno.id_usuario}>
                                            <td>{index + 1}</td>
                                            <td>{alumno.Nombres}</td>
                                            <td>{alumno.Apellidos}</td>
                                            <td>{alumno.fecha_nacimiento.split('T')[0]}</td>
                                            <td>{alumno.celular}</td>
                                            <td>{alumno.correo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Regis_alum;
