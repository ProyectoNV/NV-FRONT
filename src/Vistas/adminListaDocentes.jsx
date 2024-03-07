import React, { useState, useEffect, useRef } from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import axios from "axios";
import '../css/ListasAdmin.css';

const AdminListaDocentes = () => {

  //Mostrar y ocultar el sidebar
  var refmove = useRef();
  const [showe, setShowe] = useState(false);
  const move_conte = (e) => {
    setShowe(!showe)
  }

  //Logica del componente, se definen las variables con sus useSate
  const [tabladocentes, setTablaDocentes] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    tipoDoc: "",
    Nombres: "",
    Apellidos: "",
    correo: "",
    celular: ""
  });

  useEffect(() => {
    VerDocentes()
  }, []);

  //Mostrar Todos los docentes de la base de datos con axios
  const VerDocentes = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:4000/admin/ver_docentes")
      setTablaDocentes(response.data)
    } catch (error) {
      console.log('Hay un errror que es: ', error)
    }
  };

  //Funcion de eliminar que va por axios
  const Eliminar = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:4000/admin/ver_docentes/${id}`);
      setTablaDocentes(tabladocentes.filter(item => item.id_usuario !== id));
      console.log("Producto eliminado exitosamente.");
      window.alert("Producto Eliminado ")
      await VerDocentes();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  //Esta funcion nombrada se le pasa un profesor y con base en el profesor que se ha seleccionado podemos obtener
  //toda la informacion de ese docente
  const Editar = async (profesor) => {
    setProfesorSeleccionado(profesor);
    setNuevosDatos({
      tipoDoc: profesor.pkfk_tdoc,
      Nombres: profesor.Nombres,
      Apellidos: profesor.Apellidos,
      correo: profesor.correo,
      celular: profesor.celular
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
      console.log(profesorSeleccionado.id_usuario)
      const response = await axios.put(`http://localhost:4000/admin/ver_docentes/${profesorSeleccionado.id_usuario}`, nuevosDatos);
      console.log("Producto actualizado exitosamente:", response.data);
      window.alert("Docente Actualizado correctamente")
      setTablaDocentes(tabladocentes.map(item =>
        (item.id_usuario === profesorSeleccionado.id_usuario ? response.data : item)
      ));
      setProfesorSeleccionado(null);
      setNuevosDatos({
        tipoDoc: "",
        Nombres: "",
        Apellidos: "",
        correo: "",
        celular: ""
      });
      await VerDocentes()
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte} />
      
      <div className="info-text">
        <h1>Listado de Docentes</h1>
        <table>
          <thead>
            <tr>
              <th>ID Registro</th>
              <th>Documento</th>
              <th>Numero Documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tabladocentes.map((docente) => (
              <tr key={docente.id}>
                <td>{docente.id_usuario}</td>
                <td>{docente.pkfk_tdoc}</td>
                <td>{docente.numero_id}</td>
                <td>{docente.Nombres}</td>
                <td>{docente.Apellidos}</td>
                <td>{docente.celular}</td>
                <td>{docente.correo}</td>
                <td>
                  <button className="editar" onClick={() => Editar(docente)}>Actualizar</button>
                  <button className="eliminar" onClick={() => Eliminar(docente.id_usuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {profesorSeleccionado && (
          <div>
            <h2>Editar Docentes</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <input type="text" name="tipoDoc" value={nuevosDatos.tipoDoc} onChange={handleChange} />
              <input type="text" name="Nombres" value={nuevosDatos.Nombres} onChange={handleChange} />
              <input type="text" name="Apellidos" value={nuevosDatos.Apellidos} onChange={handleChange} />
              <input type="email" name="correo" value={nuevosDatos.correo} onChange={handleChange} />
              <input type="text" name="celular" value={nuevosDatos.celular} onChange={handleChange} />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListaDocentes;
