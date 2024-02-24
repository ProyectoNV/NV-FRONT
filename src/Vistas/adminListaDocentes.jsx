import React, {useEffect}from "react"
import { useState, useRef} from "react";
import SidebarAdmi from "../Componentes/Dashboard_admi";
import Verifi  from "../Imagenes/Quality Check_Outline.svg"
import Check from "../Imagenes/Checklist_Line.svg";
import '../css/Formularios.css'

export const AdminListaDocentes = () => {
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

  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const resul = await fetch('http://localhost:4000/ver_docentes');
        const data = await resul.json();
        console.log(resul)
        if (!resul.ok) {
          throw new Error('Error al obtener la lista de docentes');
        }
        setDocentes(data);
        console.log(`Docentesss ${docentes}`)
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocentes();
  }, []);
    return(
      <div className={`contenert ${showe ? 'space-toggle' : null}`} ref={refmove}>
          <SidebarAdmi Move={move_conte}/>
          <section className="modal_regis-d" ref={refModal}>
              <div className="modal_container">
                  <img src={Verifi} class="modal_img"/>
                  <h2 className="modal_tittle">¿Estas seguro de actualizar tus datos</h2>
                  <p className="modal_paragraph">Una vez aceptes la información se guardara automaticamente</p>
                  <div className="content_modal_b">
                      <a href="#" class="modal_close_actu" id="close_modal_regis" onClick={Ocultar}>Cancelar</a>
                      <a href="#" class="modal_close_actu" id="Regis" onClick={Mostrar2}>Actualizar</a>
                  </div>
              </div>
          </section>
          <section className="modal_confir_regi" ref={refModal2}>
              <div className="modal_container">
                  <input type="checkbox" id="cerrar"/>
                  <label for="cerrar" id="btn-cerrar" onClick={Ocultar2}>X</label>
                  <img src={Check} className="modal_img"/>
                  <h2 className="modal_tittle">¡Felicidades!</h2>
                  <p className="modal_paragraph">La información se ha actualizado con exito</p>
              </div>
            </section>
            <div className="Info-text">
              <h1>Listado de Docentes</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Tipo de Documento</th>
                      <th>Número de ID</th>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Celular</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docentes.map(docente => (
                      <tr key={`${docente.pkfk_tdoc}-${docente.numero_id}`}>
                        <td>{docente.pkfk_tdoc}</td>
                        <td>{docente.numero_id}</td>
                        <td>{docente.Nombres}</td>
                        <td>{docente.Apellidos}</td>
                        <td>{docente.celular}</td>
                        <td>{docente.correo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
        

    )}


export default AdminListaDocentes;