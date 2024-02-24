import React from "react"
import { useState, useRef } from "react";
import SidebarDocente from "../Componentes/Dashboard_doc";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSquareCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/Registro_asistencia.css"

export const Asistencia = () => {

    const alumnos = [
        { id: 1, nombre: 'Maria', apellidos: 'Alvarado Tapia', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 2, nombre: 'Pedro', apellidos: 'Arenas Fuentes', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 3, nombre: 'Clara', apellidos: 'Ballesteros Camacho', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 4, nombre: 'Chintia', apellidos: 'Cervantes Morales', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 5, nombre: 'Alberto', apellidos: 'Diaz Sanchez', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 6, nombre: 'Marlen', apellidos: 'Feria Alvarez', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 7, nombre: 'Hector', apellidos: 'Garcia Molina', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 8, nombre: 'Raquel', apellidos: 'Lopez Garduño', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 9, nombre: 'Claudia', apellidos: 'Medina Vidal', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 10, nombre: 'Victor', apellidos: 'Zamora Guerrero', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 11, nombre: 'Angie', apellidos: 'Arias Rodriguez', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 12, nombre: 'Carlos', apellidos: 'Tunajano Valencia', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 13, nombre: 'Veronica', apellidos: 'Negro Cnator ', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 14, nombre: 'Juan', apellidos: 'Baquero Orozco', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 15, nombre: 'Erick', apellidos: 'Ardila Peña', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 16, nombre: 'Sara', apellidos: 'Bermudez Lopez', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 17, nombre: 'Esteban', apellidos: 'Castaño Ortiz', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },
        { id: 18, nombre: 'Wilson', apellidos: 'Contreras Páez', asistio: <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#1fe523", }} />, inasistio: <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#b80f0f", }} /> },


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
            name: 'Asistio',
            selector: 'asistio',
            sortable: true
        },
        {
            name: 'Inasistio',
            selector: 'inasistio',
            sortable: true
        },

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
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                    </div>
                    <div className="general">
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
        </div >

    )
}

export default Asistencia