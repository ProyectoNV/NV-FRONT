import {Registro} from "./Vistas/Registro";
import Login from "./Vistas/Login";
import Info from "./Vistas/info_sistem";
import Info_Docente from "./Vistas/Info_Docente";
import Info_admin from "./Vistas/Info_Admin";
import Info_alumno from "./Vistas/Info_Alumno";
import Eliminar from "./Vistas/Eliminar";
import Inscrip from "./Vistas/Inscribirse";
import Agregar from "./Vistas/Agregar";
import MisActividades from "./Vistas/Actividades_Alu";
import Menu_alum from "./Vistas/Menu_alumno";
import Reporte from "./Vistas/Reportes";
import Menudoc from "./Vistas/Menu_doc";
import Asistencia from "./Vistas/Registro_asistencia";
import Puntos from "./Vistas/asignacion_puntos";
import Lis from "./Vistas/Listado";
import Listas from "./Vistas/Ver_listas";
import Regis_alum from "./Vistas/Registro_Alumno";
import Regis_Docente from "./Vistas/Registrar_Docente";
import AdminListaDocentes from "./Vistas/adminListaDocentes";
import Hacer_crono from "./Vistas/Hacer_horario";
import Historial_user from "./Vistas/Historial_Usuario";
import Enviar_Reporte from "./Vistas/Enviar_Reporte";
import Horario from "./Vistas/Horario";
import RestablecerContra from "./Vistas/RestablecerContra";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <header>
      <Routes>
        <Route path="/Info_Sistem" element={<Info/>}></Route>
        <Route path="/Enviar_Reportes" element={<Enviar_Reporte/>}></Route>
        <Route path="/Menu_Docente" element={<Menudoc/>}></Route>
        <Route path="/Asistencia" element={<Asistencia/>}></Route>
        <Route path="/Puntos" element={<Puntos/>}></Route>
        <Route path="/Mis_Actividades" element={<MisActividades/>}></Route>
        <Route path="/menu_Alumno" element={<Menu_alum/>}></Route>
        <Route path="/reporte" element={<Reporte/>}></Route>
        <Route path="/horario" element={<Horario/>}></Route>
        <Route path="/Informacion_Personal_Docente" element={<Info_Docente/>}></Route>
        <Route path="/Informacion_Personal_Administrador" element={<Info_admin/>}></Route>
        <Route path="/Informacion_Personal_Alumno" element={<Info_alumno/>}></Route>
        <Route path="/Historial_De_Usuario" element={<Historial_user/>}></Route>
        <Route path="/Agregar_cronograma" element={<Hacer_crono/>}></Route>
        <Route path="/admin/registrar_Docente" element={<Regis_Docente/>}></Route>
        <Route path="/admin/ver_docentes" element={<AdminListaDocentes/>}></Route>
        <Route path="/registrar_alumno" element={<Regis_alum/>}></Route>
        <Route path="/verlista" element={<Listas/>}></Route>
        <Route path="/agregar" element={<Agregar/>}></Route>
        <Route path="/Eliminar" element={<Eliminar/>}></Route>
        <Route path="/inscribirse" element={<Inscrip/>}></Route>
        <Route path="/lista" element={<Lis/>}></Route>
        <Route path="/Registro" element={<Registro/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Restablecer" element={<RestablecerContra/>}></Route>
      </Routes>
    </header>
    
  )
}

export default App;