import React from "react";
import { useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import Menu from "../Imagenes/iconos/bx-menu.svg";
import Arrow from "../Imagenes/iconos/arrow.svg";
import User from "../Imagenes/user.jpg";
import Registered from "../Imagenes/iconos/bxs-registered.svg";
import Exten from "../Imagenes/iconos/bxs-extension.svg";
import Calendario from "../Imagenes/iconos/bxs-calendar.svg";
import Data from "../Imagenes/iconos/bxs-data.svg";
import Reportimg from "../Imagenes/iconos/bxs-report.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import '../css/sidebar.css';

export const SidebarAdmi = ({Move}) => {

    const [show, setShow]= useState(false);
    var refRegistro = useRef();
    var refarrow1 = useRef();
    var refarrow2 = useRef();
    var refarrow3 = useRef();
    var refHorario= useRef();
    var refActividades= useRef();
    const navigate = useNavigate();

    const username = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).nombre;

    const cerrarsession = () =>{
        sessionStorage.removeItem('pruebasesion')
        navigate("/");
    }

    const Desplegar = (e) =>{
        switch (e.target.id){
            case "opti_regis": 
                refarrow1.current.classList.toggle('arrow');
                let height = 0;
                if(refRegistro.current.clientHeight=="0"){
                    height=refRegistro.current.scrollHeight;
                }
                refRegistro.current.style.height = height+"px";
            break;
            case "opti_acti":
                refarrow2.current.classList.toggle('arrow');
                let height2 = 0;
                if(refActividades.current.clientHeight=="0"){
                    height2=refActividades.current.scrollHeight;
                }
                refActividades.current.style.height = height2+"px";
            break;
            case "opti_horari":
                refarrow3.current.classList.toggle('arrow');
                let height3 = 0;
                if(refHorario.current.clientHeight=="0"){
                    height3=refHorario.current.scrollHeight;
                }
                refHorario.current.style.height = height3+"px";
            break;
        }
    }

    const con_mov = (e) => {
        setShow(!show);
        Move();
    }

    return (
        <main  style={{width: '100%'}}>
            <header className={`Barra-nav ${show ? 'barra-nav-show' : null}`}>
                <ul>
                    <li>
                        <a href="#!" className="toggle-btn" id="btn_open" onClick={con_mov}><img src={Menu}/></a>
                    </li>
                </ul>
            </header> 
            <section  className={`sidebar ${show ? 'showed' : null}`} id="sidebar">
               <nav className="nav">
                    <div className="sideBar-title">
                        N.V Coordination
                    </div>
                    <div className="sideBar-UserInfo">
                        <figure className="sidebar-photo">
                            <img src={User} alt="Userphoto"/><br></br>
                            <p>{!!username ? username : 'null'}</p>
                            <i className="btn_img"><i className="fa-solid"><Link to="/Informacion_Personal_Administrador"><FontAwesomeIcon icon={faUserPen}/></Link></i></i>
                            <i className="btn_img" onClick={cerrarsession}><i className="fa-solid"><FontAwesomeIcon icon={faRightFromBracket}/></i></i>
                        </figure>
                    </div>
                    <ul className="Barra-lateral">
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Menu} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/Info_Sistem">Menu</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item Barra-lateral_item-click">
                            <div className="Barra-lateral_button Barra-lateral_button--click" id="opti_regis" onClick={Desplegar}>
                                <img src={Registered} className="Barra-lateral_img"/>
                                <a href="#!" className="Barra-lateral_link">Registros</a>
                                <img src={Arrow} className="Barra-lateral_arrow" ref={refarrow1}/>
                            </div>
                            <ul className="Barra-lateral_show" ref={refRegistro}>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/registrar_alumno">Registro Alumno</Link></i>
                                </li>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/admin/registrar_Docente">Registro Docente</Link></i>
                                </li>
                            </ul>
                        </li>
                        <li className="Barra-lateral_item Barra-lateral_item-click">
                            <div className="Barra-lateral_button Barra-lateral_button--click" id="opti_acti" onClick={Desplegar}>
                                <img src={Exten} className="Barra-lateral_img"/>
                                <a href="#!" className="Barra-lateral_link">Actividades</a>
                                <img src={Arrow} className="Barra-lateral_arrow" ref={refarrow2}/>
                            </div>
                            <ul className="Barra-lateral_show" ref={refActividades}>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/agregar">Agregar</Link></i>
                                </li>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/Eliminar">Estado</Link></i>
                                </li>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/verlista">Listas</Link></i>
                                </li>
                            </ul>
                        </li>
                        <li className="Barra-lateral_item Barra-lateral_item-click">
                            <div className="Barra-lateral_button Barra-lateral_button--click" id="opti_horari" onClick={Desplegar}>
                                <img src={Calendario} className="Barra-lateral_img"/>
                                <a href="#!" className="Barra-lateral_link">Horario</a>
                                <img src={Arrow} className="Barra-lateral_arrow" ref={refarrow3}/>
                            </div>
                            <ul className="Barra-lateral_show" ref={refHorario}>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/Agregar_cronograma">Gestionar horario</Link></i>
                                </li>
                                <li className="Barra-lateral_inside">
                                    <i className="Barra-lateral_link Barra-lateral_link--inside"><Link to="/horario">Ver horario</Link></i>
                                </li>
                            </ul>
                        </li> 
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Data} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/Historial_De_Usuario">Historial de Usuario</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Reportimg} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/Enviar_Reportes">Reportes</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Reportimg} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/Solicitudes">Solicitudes</Link></i>
                            </div>   
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    )

}

export default SidebarAdmi