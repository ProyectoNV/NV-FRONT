import React from "react"
import { useState, useRef } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/Registro_asistencia.css"

export const Puntos = () => {
    const alumnos = [
        { id:1, nombre: 'Maria',apellidos:'Alvarado Tapia', puntos:"10" , Observaciones: "NA"},
        { id:2, nombre: 'Pedro',apellidos:'Arenas Fuentes',puntos:"9" , Observaciones:"NA" },
        { id:3, nombre: 'Clara',apellidos:'Ballesteros Camacho',puntos:"7", Observaciones:"NA"  },
        { id:4, nombre: 'Chintia',apellidos:'Cervantes Morales', puntos:"6", Observaciones:"NA" },
        { id:5, nombre: 'Alberto',apellidos:'Diaz Sanchez',  puntos:"9", Observaciones:"NA"},
        { id:6, nombre: 'Marlen',apellidos:'Feria Alvarez', puntos:"5" , Observaciones:"NA"},
        { id:7, nombre: 'Hector',apellidos:'Garcia Molina', puntos:"6", Observaciones:"NA" },
        { id:8, nombre: 'Raquel',apellidos:'Lopez Garduño', puntos:"8" , Observaciones:"NA"},
        { id:9, nombre: 'Claudia',apellidos:'Medina Vidal', puntos:"10" , Observaciones:"NA"},
        { id:10, nombre: 'Victor',apellidos:'Zamora Guerrero',puntos:"6" , Observaciones:"NA"},
        { id:11, nombre: 'Angie',apellidos:'Arias Rodriguez' ,puntos:"10", Observaciones:"NA"},
        { id:12, nombre: 'Carlos',apellidos:'Tunajano Valencia',puntos:"10", Observaciones:"NA"},
        { id:13, nombre: 'Veronica',apellidos:'Negro Cnator ' ,puntos:"10", Observaciones:"NA"},
        { id:14, nombre: 'Juan',apellidos:'Baquero Orozco' ,puntos:"9" , Observaciones:"NA"},
        { id:15, nombre: 'Erick',apellidos:'Ardila Peña',puntos:"7" , Observaciones:"NA"},
        { id:16, nombre: 'Sara',apellidos:'Bermudez Lopez' ,puntos:"4", Observaciones:"NA"},
        { id:17, nombre: 'Esteban',apellidos:'Castaño Ortiz',puntos:"6" , Observaciones:"NA"},
        { id:18, nombre: 'Wilson',apellidos:'Contreras Páez',puntos:"8" , Observaciones:"NA"},


    ];
    const columnas = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true
        },
        {
            name: 'Apellidos',
            selector: 'apellidos',
            sortable: true,
            
        },
        {
            name: 'Puntos',
            selector: 'puntos',
            sortable: true,
            
        },
        {
            name: 'Observaciones',
            selector: 'Observaciones',
            sortable: true,
            
        }
        

    ]
    const paginacionOpciones = {
        rowPerPageText: 'Filas por pagina',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    var refmove = useRef();
    const [showe, setShowe] = useState(false);
    const move_conte = (e) => {
        setShowe(!showe)
        
    }
    return (
        <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
            <SidebarDocente Move={move_conte} />
            <div className="table-responsive">
                <div className="barraBusqueda">
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="busqueda"
                    />
                    <button type="button" className="btnBuscar">
                        {""}
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>

                </div>

                <DataTable
                    columns={columnas}
                    data={alumnos}
                    title="Gestione las asistencia de su curso"
                    pagination
                    paginationComponentOptions={paginacionOpciones}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                />
            </div>
        </div>

    )
}

export default Puntos