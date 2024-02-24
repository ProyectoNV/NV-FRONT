import React from "react";
import login_img from '../Imagenes/Login-img.jpeg';
import Swal from "sweetalert2";
import {Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

export const Login = () => {
    //Creacion de un objeto con 2 propiedades 
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate=useNavigate();

    const Alerta=(icono,titulo,descripcion)=>{
        Swal.fire({
            icon:icono,
            title:titulo,
            text:descripcion
        });
    };

    const verificarForm=(e)=>{
        e.preventDefault();
        if(formData.password.length<=7){
            Alerta("error","Error en la contraseña","Debe tener minimo 8 caracteres");
        }else{
            //console.log(formData);
            fetch('http://localhost:3001/Ingreso',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
                .then(response=>response.json())
                .then(result=>{
                    if(result.length>0){
                        Alerta("success","Inicio de sesion exitoso","")
                        setTimeout(() => {
                            navigate("/Menu_alumno");
                        }, 1500);
                    }else{
                        Alerta("error","Usuario no encontrado","verifique los datos");
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
            }
    };

    //Esta funcion actualiza el formData, teniendo en cuenta el nombre y el valor
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    return (
        <div className="container-login">
            <form className="form_login" onSubmit={verificarForm}>
                <img src={login_img} alt="logo" />
                <h1>Bienvenidos</h1>
                <input className="inputLogin" type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Ingrese su correo" required/>
                <input className="inputLogin" type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Ingrese su contraseña" required/> 
                <button className="btn-iniciar" type="submit">Ingresar</button>
                <div className="links">
                    <Link to="/RecuperarContraseña">
                        <label className="label-cursor">Olvido su contraseña</label>
                    </Link>
                    <Link to="/registro">
                    </Link>
                        <label className="label-cursor">Pre-Registro</label>
                </div>
            </form>
        </div>
    )
}

export default Login