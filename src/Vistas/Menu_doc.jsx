import React from "react"
import { useState, useRef } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import "../css/Menu_doc.css"
import Camara from "../Imagenes/camara.png"
import Grupo from "../Imagenes/grupo.png"
import LinesChart from "../Componentes/Estadistica";



export const Menudoc = () => {

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
    }
    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte} />
            <div style={{ with: "800px" }}>
                <h1 className="title"> Docente</h1>
                <div className="article">
                    <div className="doc">
                        <div className="gen">
                            <article className="num">
                                <div className="icono">
                                    <img src={Camara} />
                                </div>
                                <div className="text">
                                    <h4><strong>Fotografía</strong> </h4>
                                    <p>La foto perfecta es aquella que capta momentos inolvidables.</p>
                                    <p ><small>Daniel Buitrago</small></p>
                                </div>
                            </article>
                        </div>
                        <div className="gen">
                            <article className="num">
                                <div className="icono">
                                    <img src={Grupo} />
                                </div>
                                <div className="text">
                                    <h4><strong>Cantidad de alumnos registrados</strong></h4>
                                    <p>La cantidad total de estuduantes inscritos son:30.</p>
                                    <p><small>Daniel Buitrago</small></p>
                                </div>


                            </article>
                        </div>
                    </div>
                    <div className="option_function">
                        <div className="grafica">
                            <LinesChart />
                        </div>
                    </div>
                    
                </div>


            </div>
        </div>


    )
}

export default Menudoc