import React, { useState, useEffect, useRef } from "react";
import SidebarAdmi from '../Componentes/Dashboard_admi';
import axios from "axios";
import '../css/ListasAdmin.css';
import Swal from "sweetalert2";

function AceptarRegistros() {
  // Mostrar y ocultar el sidebar
  var refmove = useRef();
  const [showe, setShowe] = useState(false);
  const move_conte = (e) => {
    setShowe(!showe)
  };

  const [tablaUsuariosPendientes, setTablaUsuariosPendientes] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [listUpdated, setListUpdated] = useState(false)

  useEffect(() => {
    VerUsuariosPendientes();
    setListUpdated(false);
  }, [listUpdated]);

  // Mostrar todos los usuarios pendientes de la base de datos con axios
  const VerUsuariosPendientes = async () => {
    try {
      const response = await axios.get("https://nv-backend-nine.vercel.app/solicitudes");
      setTablaUsuariosPendientes(response.data.usuarios);
    } catch (error) {
      console.log('Hay un error que es: ', error);
    }
  };

  // Función para ver más detalles de un usuario
  const Ver = async (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  // Función para aceptar un usuario pendiente
  const Aceptar = async (id) => {
    try {
      await axios.put(`https://nv-backend-nine.vercel.app/solicitudesaceptar/${id}`);
      setTablaUsuariosPendientes(tablaUsuariosPendientes.filter(item => item.id_usuario !== id));
      Swal.fire({
        icon: 'success',
        title: 'Usuario aceptado',
        text: `Usuario con ID ${id} aceptado.`,
      });
    } catch (error) {
      console.error("Error al aceptar el usuario:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al aceptar el usuario.',
      });
    }
    setListUpdated(true)
  };

  // Función para rechazar un usuario pendiente
  const Rechazar = async (id) => {
    try {
      await axios.delete(`https://nv-backend-nine.vercel.app/solicitudesrechazar/${id}`);
      setTablaUsuariosPendientes(tablaUsuariosPendientes.filter(item => item.id_usuario !== id));
      Swal.fire({
        icon: 'success',
        title: 'Usuario rechazado',
        text: `Usuario con ID ${id} rechazado y eliminado.`,
      });
    } catch (error) {
      console.error("Error al rechazar el usuario:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al rechazar el usuario.',
      });
    }
    setListUpdated(true)
  };

  return (
    <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
      <SidebarAdmi Move={move_conte} />

      <div className="info-text">
        <h1>Listado de Solicitudes</h1>
        <table>
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Documento</th>
              <th>Numero Documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha Nacimiento</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tablaUsuariosPendientes.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.pkfk_tdoc}</td>
                <td>{usuario.numero_id}</td>
                <td>{usuario.Nombres}</td>
                <td>{usuario.Apellidos}</td>
                <td>{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.celular}</td>
                <td>
                  <button className="editar" onClick={() => Aceptar(usuario.id_usuario)}>Aceptar</button>
                  <button className="eliminar" onClick={() => Rechazar(usuario.id_usuario)}>Rechazar</button>
                  <button className="editar" onClick={() => Ver(usuario)}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usuarioSeleccionado && (
          <div>
            <h2>Detalles del Usuario</h2>
            <form className="form-container">
              <input type="text" name="tipoDoc" value={usuarioSeleccionado.pkfk_tdoc} readOnly />
              <input type="text" name="Nombres" value={usuarioSeleccionado.Nombres} readOnly />
              <input type="text" name="Apellidos" value={usuarioSeleccionado.Apellidos} readOnly />
              <input type="text" name="numero_id" value={usuarioSeleccionado.numero_id} readOnly />
              <input type="date" name="fecha_nacimiento" value={new Date(usuarioSeleccionado.fecha_nacimiento).toISOString().split('T')[0]} readOnly />
              <input type="email" name="correo" value={usuarioSeleccionado.correo} readOnly />
              <input type="text" name="celular" value={usuarioSeleccionado.celular} readOnly />
              {/* Puedes agregar más campos según sea necesario */}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AceptarRegistros;
