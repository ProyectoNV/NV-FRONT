import React from "react"
import {Link } from "react-router-dom"
import { useState } from "react";
import Swal from "sweetalert2";
import '../css/Login.css';

export const Registro = () => {
    const[tipoId,setTipoId]=useState("");
    const[numeroId,setNumeroId]=useState("");
    const[nombres,setNombres]=useState("");
    const[apellidos,setApellidos]=useState("");
    const[fecha,setFecha]=useState("");
    const[genero,setGenero]=useState("");
    const[correo,setCorreo]=useState("");
    const[telefono,setTelefono]=useState("");
    const[contraseña,setContraseña]=useState("");
    const[confirmarContraseña,setConfirmarContraseña]=useState("");


    const Alerta=(icono,titulo,descripcion)=>{
        Swal.fire({
            icon:icono,
            title:titulo,
            text:descripcion
        });
    };

    const VerificarCampos=(e)=>{
        e.preventDefault();

        if(nombres.length<3 || apellidos.length<3){
            Alerta("error","Error","Ingrese un nombre o apellido valido")
            return false;
        }
        
        if((contraseña.length === confirmarContraseña.length)){
            if(contraseña === confirmarContraseña){
                console.log("Correcto");
            }else{
                console.log("Deben ser iguales");
                return false;
            }            
        }else{
            Alerta("error","Error en la contraseña","La contraseña y su confirmacion deben ser iguales");
            return false;
        }

        Alerta("sucess","Pre Registro Exitoso","Tu Pre registro se ha enviado correctamente")
    }

    return (
        <div className="container_registro">
            <form className="form_registro" onSubmit={VerificarCampos}>
                <h1>Pre-Registro</h1>
                <label htmlFor="tipo_identificación">Tipo ID</label>
                <select value={tipoId} onChange={(e)=>setTipoId(e.target.value)} required>
                    <option value="" disabled selected>Seleccione su tipo de documento</option>
                    <option value="RC">RC</option>
                    <option value="TI">TI</option>
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="PEP">PEP</option>
                </select>
                <input  className="inputRegistro" type="text" placeholder="Ingrese su numero de identificación" pattern="[0-9]{6,}" title="Ingrese solo numeros sin puntos ni comas" value={numeroId} onChange={(e)=>setNumeroId(e.target.value)} required/>
                <input className="inputRegistro" type="text" placeholder="Ingrese sus nombres" value={nombres} onChange={(e)=>setNombres(e.target.value)} required/>
                <input className="inputRegistro" type="text" placeholder="Ingrese sus apellidos" value={apellidos} onChange={(e)=>setApellidos(e.target.value)} required/>
                <label htmlFor="inputRegistro">Fecha de Nacimiento</label>
                <input className="inputRegistro" type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} required/>
                <label htmlFor="genero">Genero</label>
                <select value={genero} onChange={(e)=>setGenero(e.target.value)} required>
                    <option value="" disabled selected>Seleccione su genero</option>
                    <option value="Femenino" defaultValue={"Femenino"}>Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                </select>
                <input className="inputRegistro" type="email" placeholder="Ingrese su correo" value={correo} onChange={(e)=>setCorreo(e.target.value)} required/>
                <input className="inputRegistro" type="tel" placeholder="Ingrese su telefono" pattern="[0-9]*" value={telefono} onChange={(e)=>setTelefono(e.target.value)} required/>
                <input className="inputRegistro" type="password" placeholder="Ingrese su contraseña" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!*@#$%&]).{8,}" value={contraseña} onChange={(e)=>setContraseña(e.target.value)} required/> 
                <input className="inputRegistro" type="password" placeholder="Confirme su contraseña" value={confirmarContraseña} onChange={(e)=>setConfirmarContraseña(e.target.value)} required/>  
                <button className="btnRegistro" type="submit">Registrar</button>
                <Link to="/ingreso">
                    <label className="label-cursor">Iniciar sesion</label>
                </Link>
            </form>
        </div>
        
    )
}

export default Registro