import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Lis from "./Listado";
import '../css/Lista_pro.css';

const Listas = () => {
    const refmove = useRef();
    const [showe, setShowe] = useState(false);

    const move_conte = () => {
        setShowe(!showe);
    };

    // Función get
    const [listUpdated, setListUpdated] = useState(false);
    const [actuaEstado, setActuaEstado] = useState([]);

    useEffect(() => {
        const actuaactividad = async () => {
            try {
                const getActualizar = await fetch('http://localhost:4000/actividades/mostrar');
                const dataActualizar = await getActualizar.json();
                setActuaEstado(dataActualizar);
                console.log(dataActualizar);
            } catch (error) {
                console.log(error);
            }
        };
        actuaactividad();
        setListUpdated(false);
    }, [listUpdated]);

    const [content, setContent] = useState(false);

    const VerLista = (id) => {
        console.log('>>> ',id);
        setContent(<Lis id={id}/>);
    };

    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarAdmi Move={move_conte} />
            <div className="cont_card">
                <h1>Ver Listas</h1>
                <div className="cont_eliminar">                   
                    {content ? (
                        content
                    ) : (
                        actuaEstado.map((actulist) => (
                            <div className="card_d" key={actulist.id_actividad}>
                                <figure style={{backgroundColor:('#8b0fff')}}>
                                    <img src={require(`../Imagenes/Biblioteca_Imagenes/${actulist.foto}.png`)}/>
                                </figure>
                                <div className="contenido">
                                    <h3>{actulist.Nombre_actividad}</h3>
                                    <p>{actulist.descripcion}</p>
                                    <a id={actulist.id_actividad} onClick={() => VerLista(actulist.id_actividad)}>Ver Lista</a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listas;
