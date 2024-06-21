import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../Imagenes/iconos/bx-menu.svg";
import User from "../Imagenes/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faRightFromBracket, faClipboardCheck, faRectangleList, faCalendar } from "@fortawesome/free-solid-svg-icons";

import '../css/sidebar.css';

export const SidebarDocente = ({ Move }) => {
    const navigate = useNavigate();

    const username = sessionStorage.getItem('pruebasesion') && JSON.parse(sessionStorage.getItem('pruebasesion')).nombre;

    const cerrarsession = () =>{
        sessionStorage.removeItem('pruebasesion')
        navigate("/");
    }

    const [show, setShow] = useState(false);

    const con_mov = (e) => {
        setShow(!show);
        Move();
    }

    return (
        <main>
            <header className={`Barra-nav ${show ? 'barra-nav-show' : null}`}>
                <ul>
                    <li>
                        <a href="#!" className="toggle-btn" id="btn_open" onClick={con_mov}><img src={Menu} /></a>
                    </li>
                </ul>
            </header>
            <section className={`sidebar ${show ? 'showed' : null}`} id="sidebar">
                <nav className="nav">
                    <div className="sideBar-title">
                        N.V Coordination
                    </div>
                    <div className="sideBar-UserInfo">
                        <figure className="sidebar-photo">
                            <img src={User} alt="Userphoto" /><br />
                            <p>{!!username ? username : 'null'}</p>
                            <i className="btn_img"><i className="fa-solid"><Link to="/Informacion_Personal_Docente"><FontAwesomeIcon icon={faUserPen}/></Link></i></i>
                            <i className="btn_img" onClick={cerrarsession}><i className="fa-solid"><FontAwesomeIcon icon={faRightFromBracket}/></i></i>
                        </figure>
                    </div>

                    <ul className="Barra-lateral">
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <img src={Menu} className="Barra-lateral_img" alt="Menu" />
                                <Link to="/Menu_Docente" className="Barra-lateral_link">Menu</Link>
                            </div>
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faCalendar} className="Barra-lateral_img" />
                                <Link to="/CronogramaDocente" className="Barra-lateral_link">Ver Horario</Link>
                            </div>   
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faRectangleList} className="Barra-lateral_img" />
                                <Link to="/Asistencia" className="Barra-lateral_link">Registro de Asitencia</Link>
                            </div>               
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faClipboardCheck} className="Barra-lateral_img" />
                                <Link to="/Puntos" className="Barra-lateral_link">Asignar puntos</Link>
                            </div>
                        </li>
                        <li className="Barra-lateral_item">
                            <div className="Barra-lateral_button">
                                <FontAwesomeIcon icon={faClipboardCheck} className="Barra-lateral_img" />
                                <Link to="/Observaciones" className="Barra-lateral_link">Observaciones</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    );
}

export default SidebarDocente;
