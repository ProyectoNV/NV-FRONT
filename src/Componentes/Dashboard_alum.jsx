import React from "react";
import { useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Menu from "../Imagenes/iconos/bx-menu.svg";
import User from "../Imagenes/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faRightFromBracket, faCalendar, faBookOpen, faPenToSquare, faFile} from "@fortawesome/free-solid-svg-icons";
import '../css/sidebar.css';

export const SidebarAlum = ({Move}) => {

    const navigate = useNavigate();

    const username = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).nombre;

    const cerrarsession = () =>{
        sessionStorage.removeItem('pruebasesion')
        navigate("/");
    }

    const [show, setShow]= useState(false);

    const con_mov = (e) => {
        setShow(!show);
        Move();
    }

    return (
        <main>
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
                            <i className="btn_img"><i className="fa-solid icons_side"><Link to="/Informacion_Personal_Alumno"><FontAwesomeIcon icon={faUserPen}/></Link></i></i>
                            <i className="btn_img" onClick={cerrarsession}><i className="fa-solid"><Link to="/"><FontAwesomeIcon icon={faRightFromBracket}/></Link></i></i>
                        </figure>
                    </div>
                    <ul className="Barra-lateral">
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Menu} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/menu_Alumno">Menu</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faCalendar} className="Barra-lateral_img"/> 
                                <i className="Barra-lateral_link"><Link to="/CronogramaAlumno">Ver Horario</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faBookOpen} className="Barra-lateral_img"/> 
                                <i className="Barra-lateral_link"><Link to="/Mis_Actividades">Mis Actividades</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faPenToSquare} className="Barra-lateral_img"/>
                                <i className="Barra-lateral_link"><Link to="/inscribirse">Inscripciones</Link></i>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faFile} className="Barra-lateral_img"/> 
                                <i className="Barra-lateral_link"><Link to="/reporte">Reportes</Link></i>
                            </div>   
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    )

}

export default SidebarAlum