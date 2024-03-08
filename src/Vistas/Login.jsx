import React from "react";
import login_img from '../Imagenes/Login-img.jpeg';
import Swal from "sweetalert2";
import {Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

export const Login = () => {
    //Creacion de un objeto con 2 propiedades 
    const [formData, setFormData] = useState({ correo: "", contrasena: "" });
    const navigate = useNavigate();

    const Alerta=(icono,titulo,descripcion)=>{
        Swal.fire({
            icon:icono,
            title:titulo,
            text:descripcion
        });
    };

    const verificarForm=(e)=>{
        e.preventDefault();
        if(formData.contrasena.length<=2){
            Alerta("error","Error en la contraseña","Debe tener minimo 8 caracteres");
        }else{
            //console.log(formData);
            fetch('http://localhost:4000/ingresar',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
                .then(response=>response.json())
                .then(result=>{
                    console.log(result)
                    if(result.success){
                        const datausuario = JSON.stringify(result.usuario)
                        sessionStorage.setItem('pruebasesion', datausuario)
                        Alerta("success","Inicio de sesion exitoso","")
                        setTimeout(() => {
                            if(result.usuario.rol==12){
                                navigate("/menu_Alumno");
                              }
                              else if(result.usuario.rol==11){
                                navigate("/Menu_Docente") ;
                              }
                              else if(result.usuario.rol==10){
                                navigate("/Info_Sistem");
                              }
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

    const [ruta, setRuta] = useState("/Info_Sistem");

    
    return (
        <div className="fondo">
            <div className="container-login">
                <form className="form_login" onSubmit={verificarForm}>
                    <img src={login_img} alt="logo" />
                    <h1>Bienvenidos</h1>
                    <input value={formData.correo} className="inputLogin" type="email" name="correo" onChange={handleInput} placeholder="Ingrese su correo" required/>
                    <input value={formData.contrasena} className="inputLogin" type="password" name="contrasena" onChange={handleInput}  placeholder="Ingrese su contraseña" required/> 
                    <button type="submit" className="btn-iniciar">Ingreso</button><br></br>
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
        </div>
        
    )
}

export default Login