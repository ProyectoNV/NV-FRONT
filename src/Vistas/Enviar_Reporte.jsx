import React from "react"
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Buscar from "../Imagenes/iconos/bx-search.svg";
import Reportes from "../Componentes/Reportes_list";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Formularios.css'

export const Enviar_Reporte = () => {

    var refModal = useRef();
    var refModal2 = useRef();

    const Mostrar = (e) => {
        const myrefValue = refModal.current;
        myrefValue.style.opacity= "1";
        myrefValue.style.pointerEvents= "inherit";
    };

    const Mostrar2 = (e) => {
        const myrefValue = refModal2.current;
        myrefValue.style.opacity= "1";
        myrefValue.style.pointerEvents= "inherit";
    };

    const Ocultar = (e) =>{
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity= "0";
        myrefocultar.style.pointerEvents= "none";
    }

    const Ocultar2 = (e) =>{
        const myrefocultar = refModal.current;
        myrefocultar.style.opacity= "0";
        myrefocultar.style.pointerEvents= "none";
        const myrefocultar2 = refModal2.current;
        myrefocultar2.style.opacity= "0";
        myrefocultar2.style.pointerEvents= "none";
    }
    
    var refmove = useRef();
	const [showe, setShowe]= useState(false);
	const move_conte = (e) => {
		setShowe(!showe)
	}
    return(
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte}/>
            <section className="modal_regis-d" ref={refModal}>
                <div className="modal_container">
                    <img src={Verifi} class="modal_img"/>
                    <h2 className="modal_tittle">¿Estas seguro de enviar este reporte?</h2>
                    <p className="modal_paragraph">Los Reportes se enviaran al correo</p>
                    <div className="content_modal_b">
                        <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                        <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Enviar</a>
                    </div>
                </div>
            </section>
            <section className="modal_confir_regi" ref={refModal2}>
                <div className="modal_container">
                    <input type="checkbox" id="cerrar"/>
                    <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                    <img src={Check} className="modal_img"/>
                    <h2 className="modal_tittle">¡Felicidades!</h2>
                    <p className="modal_paragraph">La información se ha enviado con exito</p>
                </div>
            </section>
            <div className="info-text">
			    <h1>Historial de Usuario</h1>
                <div class="buscar">
                    <input type="text" placeholder="Ingrese numero de documento del estudiante" required/>
                    <div class="buscar_icon">
                        <i><img src={Buscar}/></i>
                    </div>
                </div><br></br>
                <div style={{width: '900px'}}>
                    <div className="reports_info">
                    <table className="table_horario" border="1">
                        <tr class="activi_tittle_t">
                            <td colspan="4"><strong>Futbol Pequeños</strong></td>
                        </tr>
                        <tr class="th_horario">
                            <th className="th_horario">Fecha</th>
                            <th className="th_horario">asistencia</th>
                            <th className="th_horario">puntos</th>
                            <th className="th_horario">observación</th>
                        </tr>
                        {Reportes.map((report) => (
                            <tr>
                                <td>{report.Fecha}</td>
                                <td>{report.Asistencia}</td>
                                <td>{report.Puntos}</td>
                                <td>{report.Observaciones}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="reports_info">
                    <table className="table_horario" border="1">
                        <tr class="activi_tittle_t">
                            <td colspan="4"><strong>Futbol Pequeños</strong></td>
                        </tr>
                        <tr class="th_horario">
                            <th className="th_horario">Fecha</th>
                            <th className="th_horario">asistencia</th>
                            <th className="th_horario">puntos</th>
                            <th className="th_horario">observación</th>
                        </tr>
                        {Reportes.map((report) => (
                            <tr>
                                <td>{report.Fecha}</td>
                                <td>{report.Asistencia}</td>
                                <td>{report.Puntos}</td>
                                <td>{report.Observaciones}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="reports_info">
                    <table className="table_horario" border="1">
                        <tr class="activi_tittle_t">
                            <td colspan="4"><strong>Futbol Pequeños</strong></td>
                        </tr>
                        <tr class="th_horario">
                            <th className="th_horario">Fecha</th>
                            <th className="th_horario">asistencia</th>
                            <th className="th_horario">puntos</th>
                            <th className="th_horario">observación</th>
                        </tr>
                        {Reportes.map((report) => (
                            <tr>
                                <td>{report.Fecha}</td>
                                <td>{report.Asistencia}</td>
                                <td>{report.Puntos}</td>
                                <td>{report.Observaciones}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div class="btn_actu"><a className="button_formu" type="submit" id="btn_actu-d" onClick={Mostrar}>Enviar Reporte</a></div>
                </div>
			</div>
        </div>
    )
}

export default Enviar_Reporte