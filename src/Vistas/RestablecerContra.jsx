
import React from 'react'

const RestablecerContra = () => {
  return (
    <div>
        <fieldset className="caja-recuperar">
            <legend>Recuperar Contraseña</legend>
            <div className="inputs-recuperar">
                <input type="email" id="contrasenaa" placeholder="Ingrese su correo" required />
                <input type="email" id="contrasenaa_con" placeholder="Ingrese nuevamente su correo" required />
                <button type="button" >Restablecer Contraseña</button>
            </div>
      </fieldset>
    </div>
  )
}

export default RestablecerContra
