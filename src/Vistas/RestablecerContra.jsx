import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/Login.css';
import Swal from 'sweetalert2';

const RestablecerContra = () => {
  const [correo, setCorreo] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');
  const [confirmacionContra, setConfirmacionContra] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Alerta=(icono,titulo,descripcion)=>{
      Swal.fire({
          icon:icono,
          title:titulo,
          text:descripcion
      });
    };

    try {
      if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
        setMensaje('Ingrese un correo electrónico válido');
        return;
      }

      if (nuevaContra !== confirmacionContra) {
        Alerta("error","ERROR","Las contraseñas deben ser iguales")
        return;
      }

      const response = await axios.put('http://localhost:4000/recuperarContrasena', { correo, nuevaContra, confirmacionContra });
      if (response.data.success) {
        Alerta("success","Exitoso",response.data.message || "Contraseña actualizada exitosamente")
      } else {
        Alerta("error", "Error", response.data.message || 'No se pudo restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setMensaje('Ocurrió un error al restablecer la contraseña');
    }
  };

  return (
    <div className="fondo">
    <div className="container-login">
        <fieldset className="form_login">
          <h1>Restablecer Contraseña</h1>
          <form  onSubmit={handleSubmit}>
            <div>
              <input
                className="inputLogin"
                type="email"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <input
                className="inputLogin"
                type="password"
                placeholder="Nueva Contraseña"
                value={nuevaContra}
                onChange={(e) => setNuevaContra(e.target.value)}
                required
              />
              <input
                className="inputLogin"
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmacionContra}
                onChange={(e) => setConfirmacionContra(e.target.value)}
                required
              />
              <button type="submit" className="btn-iniciar">Restablecer Contraseña</button>
            </div>
            <div className="iniciar-sesion-link">
              <Link to="/">
                <label className="label-cursor">Iniciar sesion</label>
              </Link>
            </div>
          </form>
        </fieldset>
        {mensaje && <p>{mensaje}</p>}
    </div>
    </div>
  );
};

export default RestablecerContra;
