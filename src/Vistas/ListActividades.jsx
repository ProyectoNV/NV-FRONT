import React, { useState, useEffect, useRef } from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import axios from "axios";
import '../css/ListasAdmin.css';
import Swal from "sweetalert2";


const AdminListaActividades = () => {

  //Mostrar y ocultar el sidebar
  var refmove = useRef();
  const [showe, setShowe] = useState(false);
  const move_conte = (e) => {
    setShowe(!showe)
  }

  let fechaactual = new Date();
  let anoac = fechaactual.getFullYear();

  //Logica del componente, se definen las variables con sus useSate
  const [tablaactividades, setTablaActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    id_actividad: "",
    Nombre_actividad: "",
    anho_inicio: anoac,
    foto: "",
    descripcion: "",
    Estado_actividad: ""
  });

  useEffect(() => {
    VerActividades()
  }, []);

  //Mostrar Todos los docentes de la base de datos con axios
  const VerActividades = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:4000/actividades/mostrar")
      setTablaActividades(response.data)
    } catch (error) {
      console.log('Hay un errror que es: ', error)
    }
  };


  const Editar = async (actividad) => {
    setActividadSeleccionada(actividad);
    setNuevosDatos({
      Nombre_actividad: actividad.Nombre_actividad,
      foto: actividad.foto,
      anho_inicio: actividad.anho_inicio,
      descripcion: actividad.descripcion,
      Estado_actividad: actividad.Estado_actividad
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos({ ...nuevosDatos, [name]: value });
  };

  //Se ejecuta cuando le damos clic en actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(actividadSeleccionada.id_usuario);
      const response = await axios.put(`http://localhost:4000/actividades/actualizar/${actividadSeleccionada.id_actividad}`, nuevosDatos);
      console.log(" Docente Actualizado exitosamente:", response.data);
      Swal.fire({
        icon: 'success',
        title: 'Actualizacion exitosa',
        text: 'Docente actualizado correctamente.',
      });
      setTablaActividades(tablaactividades.map(item =>
        (item.id_actividad === actividadSeleccionada.id_actividad ? response.data : item)
      ));
      setActividadSeleccionada(null);
      setNuevosDatos({
        id_actividad: "",
        Nombre_actividad: "",
        anho_inicio: "",
        foto: "",
        descripcion: "",
        Estado_actividad: ""
      });
      await VerActividades();
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar la actividad.',
      });
    }
  };
  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte} />
      
      <div className="info-text">
        <h1>Listado de Actividades</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Año Creación</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {tablaactividades.map((actividad) => (
              <tr key={actividad.id_actividad}>
                <td>{actividad.Nombre_actividad}</td>
                <td>{actividad.anho_inicio}</td>
                <td>{actividad.descripcion}</td>
                <td>Activo</td>
                <td>
                  <button className="editar" onClick={() => Editar(actividad)}>Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {actividadSeleccionada && (
          <div>
            <h2>Editar Actividades</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <input type="text" name="Nombre_actividad" value={nuevosDatos.Nombre_actividad} onChange={handleChange} />
              <select value={nuevosDatos.foto} onChange={handleChange} id="foto" name="foto">
                <option value="">Seleccione el area que mas se relacione</option>
                <option value="artes">Artes</option>
                <option value="belleza">Belleza</option>
                <option value="cine">Cine</option>
                <option value="deportes">Deportes</option>
                <option value="emprendimiento">Emprendimiento</option>
                <option value="fotografia">Fotografia</option>
                <option value="gastronomia">Gastronomia</option>
                <option value="literatura">Literatura</option>
                <option value="musica">Musica</option>
                <option value="nado">Nado</option>
                <option value="salud">Salud</option>
                <option value="teatro">Teatro</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="videojuegos">Videojuegos</option>
              </select>
              <input type="text" name="descripcion" value={nuevosDatos.descripcion} onChange={handleChange} />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListaActividades; 