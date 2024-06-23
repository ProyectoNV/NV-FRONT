import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import '../css/Login.css';

export const Registro = () => {
    const [datosRegistros, setDatosRegistros] = useState({
        tipoId: "",
        numeroId: "",
        nombres: "",
        apellidos: "",
        fecha: "",
        genero: "",
        correo: "",
        telefono: "",
        nombreAcudiente: "",
        celularAcudiente: "",
        correoAcudiente: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosRegistros({
          ...datosRegistros,
          [name]: value
        });
    };

    const Alerta = (icono, titulo, descripcion) => {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: descripcion
        });
    };

    const VerificarCampos = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/preRegistro', datosRegistros);
    
            if (response.data.success) {
                Alerta("success", "Pre Registro Exitoso", "Tu Pre registro se ha enviado correctamente");
            } else {
                Alerta("error", "Error", response.data.message || "No se pudo completar el pre registro");
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            Alerta("error", "Error", "Ocurrió un error al enviar la solicitud");
        }
    }

    return (
        <div className="fondo">
            <div className="container-login">
                <form className="form_login_r" onSubmit={VerificarCampos}>
                    <h1>Pre-Registro</h1>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="tipo_identificación" className="label_regis">Tipo ID</label>
                            <select name="tipoId" className="inputLogin_select" value={datosRegistros.tipoId} onChange={handleInputChange} required>
                                <option value="" disabled selected>Seleccione su tipo de documento</option>
                                <option value="RC">RC</option>
                                <option value="TI">TI</option>
                                <option value="CC">CC</option>
                                <option value="CE">CE</option>
                            </select>
                        </div>
                        <div className="registro-col">
                            <label htmlFor="numeroId" className="label_regis">Número de Identificación</label>
                            <input className="inputLogin" name="numeroId" type="text" placeholder="Ingrese su numero de identificación" pattern="[0-9]{6,}" title="Ingrese solo numeros sin puntos ni comas" value={datosRegistros.numeroId} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="nombres" className="label_regis">Nombres</label>
                            <input className="inputLogin" type="text" name="nombres" placeholder="Ingrese sus nombres" value={datosRegistros.nombres} onChange={handleInputChange} required />
                        </div>
                        <div className="registro-col">
                            <label htmlFor="apellidos" className="label_regis">Apellidos</label>
                            <input className="inputLogin" type="text" name="apellidos" placeholder="Ingrese sus apellidos" value={datosRegistros.apellidos} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="fecha" className="label_regis">Fecha de Nacimiento</label>
                            <input className="inputLogin" name="fecha" type="date" value={datosRegistros.fecha} onChange={handleInputChange} required />
                        </div>
                        <div className="registro-col">
                            <label htmlFor="genero" className="label_regis">Género</label>
                            <select name="genero" className="inputLogin_select" value={datosRegistros.genero} onChange={handleInputChange} required>
                                <option value="" disabled selected>Seleccione su género</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                            </select>
                        </div>
                    </div>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="correo" className="label_regis">Correo Electrónico</label>
                            <input className="inputLogin" type="email" name="correo" placeholder="Ingrese su correo" value={datosRegistros.correo} onChange={handleInputChange} required />
                        </div>
                        <div className="registro-col">
                            <label htmlFor="telefono" className="label_regis">Teléfono</label>
                            <input className="inputLogin" type="tel" name="telefono" placeholder="Ingrese su teléfono" pattern="[0-9]*" value={datosRegistros.telefono} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="nombreAcudiente" className="label_regis">Nombre del Acudiente</label>
                            <input className="inputLogin" type="text" name="nombreAcudiente" placeholder="Ingrese el nombre del acudiente" value={datosRegistros.nombreAcudiente} onChange={handleInputChange} required />
                        </div>
                        <div className="registro-col">
                            <label htmlFor="celularAcudiente" className="label_regis">Celular del Acudiente</label>
                            <input className="inputLogin" type="tel" name="celularAcudiente" placeholder="Ingrese el celular del acudiente" pattern="[0-9]*" value={datosRegistros.celularAcudiente} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="registro-row">
                        <div className="registro-col">
                            <label htmlFor="correoAcudiente" className="label_regis">Correo del Acudiente</label>
                            <input className="inputLogin" type="email" name="correoAcudiente" placeholder="Ingrese el correo del acudiente" value={datosRegistros.correoAcudiente} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <button className="btn-iniciar" type="submit">Registrar</button>
                    <Link to="/" className="label-cursor">Iniciar sesión</Link>
                </form>
            </div>
        </div>
    );
}

export default Registro;
