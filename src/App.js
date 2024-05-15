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
import Observaciones from "./Vistas/Observaciones";
import Lis from "./Vistas/Listado";
import Listas from "./Vistas/Ver_listas";
import Regis_alum from "./Vistas/Registro_Alumno";
import Regis_Docente from "./Vistas/Registrar_Docente";
import AdminListaDocentes from "./Vistas/adminListaDocentes";
import AdminListaActividades from "./Vistas/ListActividades";
import Hacer_crono from "./Vistas/Hacer_horario";
import Historial_user from "./Vistas/Historial_Usuario";
import Enviar_Reporte from "./Vistas/Enviar_Reporte";
import Horario from "./Vistas/Horario";
import CronoAlum from "./Vistas/Horario_alum";
import CronoDoc from "./Vistas/Horario_docente";
import RestablecerContra from "./Vistas/RestablecerContra";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  const SessionAbierta = ({ element }) => {  
    const isAuthenticated = !!sessionStorage.getItem('pruebasesion'); // !! convierte el valor a booleano
    //return isAuthenticated ? <Navigate to="/Info_Sistem" /> : element ;
    if(isAuthenticated){
      const rolauten = JSON.parse(sessionStorage.getItem('pruebasesion')).rol;
      console.log(rolauten)
      if(rolauten==12){
        return <Navigate to="/menu_Alumno" />;
      }
      else if(rolauten==11){
        return <Navigate to="/Menu_Docente" />;
      }
      else if(rolauten==10){
        return <Navigate to="/Info_Sistem" />;
      }
    }
    else{
      return element 
    }
    
  };

  const SessionCerrada = ({ element }) => {
    const isAuthenticated = !!sessionStorage.getItem('pruebasesion');
    
    if (isAuthenticated) {
      const rolauten = JSON.parse(sessionStorage.getItem('pruebasesion')).rol;

      if (rolauten === 10) { // Si el rol es 10 (administrador), permitir el acceso a todas las rutas
        return element;
      } else if (rolauten === 11) { // Si el rol es 11 (docente), permitir acceso solo a ciertas rutas

        const allowedRoutes = [
          '/Menu_Docente',
          '/Asistencia',
          '/Puntos',
          '/Observaciones',
          '/Informacion_Personal_Docente',
          '/CronogramaDocente'
        ];
        
        // Verifica si la ruta actual está permitida para el docente
        if (allowedRoutes.includes(window.location.pathname)) {
          return element;
        } else {
          return <Navigate to="/" />; // Redirige a la página de inicio si la ruta no está permitida
        }
      } else if (rolauten === 12) { // Si el rol es 12 (alumno), permitir acceso solo a ciertas rutas
        const allowedRoutes = [
          '/menu_Alumno',
          '/Mis_Actividades',
          '/Informacion_Personal_Alumno',
          '/inscribirse',
          '/CronogramaAlumno',
          '/reporte'
        ];
        
        if (allowedRoutes.includes(window.location.pathname)) {
          return element;
        } else {
          return <Navigate to="/" />; // Redirige a la página de inicio si la ruta no está permitida
        }
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <header>
      <Routes>
        <Route path="/" element={<SessionAbierta element={<Login/>}/>}></Route>
        <Route path="/Restablecer" element={<SessionAbierta element={<RestablecerContra/>}/>}></Route>
        <Route path="/Registro" element={<SessionAbierta element={<Registro/>}/>}></Route>

        <Route path="/Info_Sistem" element={<SessionCerrada element={<Info/>}/>}></Route>
        <Route path="/verlista" element={<SessionCerrada element={<Listas/>}/>}></Route>
        <Route path="/lista" element={<SessionCerrada element={<Lis/>}/>}></Route>
        <Route path="/agregar" element={<SessionCerrada element={<Agregar/>}/>}></Route>
        <Route path="/Eliminar" element={<SessionCerrada element={<Eliminar/>}/>}></Route>
        <Route path="/horario" element={<SessionCerrada element={<Horario/>}/>}></Route>
        <Route path="/Agregar_cronograma" element={<SessionCerrada element={<Hacer_crono/>}/>}></Route>
        <Route path="/registrar_alumno" element={<SessionCerrada element={<Regis_alum/>}/>}></Route>
        <Route path="/admin/registrar_Docente" element={<SessionCerrada element={<Regis_Docente/>}/>}></Route>
        <Route path="/admin/ver_docentes" element={<SessionCerrada element={<AdminListaDocentes/>}/>}></Route>
        <Route path="/admin/ver_actividades" element={<SessionCerrada element={<AdminListaActividades/>}/>}></Route>
        <Route path="/Enviar_Reportes" element={<SessionCerrada element={<Enviar_Reporte/>}/>}></Route>
        <Route path="/Informacion_Personal_Administrador" element={<SessionCerrada element={<Info_admin/>}/>}></Route>
        <Route path="/Historial_De_Usuario" element={<SessionCerrada element={<Historial_user/>}/>}></Route>

        <Route path="/Menu_Docente" element={<SessionCerrada element={<Menudoc/>}/>}></Route>
        <Route path="/Asistencia" element={<SessionCerrada element={<Asistencia/>}/>}></Route>
        <Route path="/Puntos" element={<SessionCerrada element={<Puntos/>}/>}></Route>
        <Route path="/Observaciones" element={<SessionCerrada element={<Observaciones/>}/>}></Route>
        <Route path="/Informacion_Personal_Docente" element={<SessionCerrada element={<Info_Docente/>}/>}></Route>
        <Route path="/CronogramaDocente" element={<SessionCerrada element={<CronoDoc/>}/>}></Route>

        <Route path="/menu_Alumno" element={<SessionCerrada element={<Menu_alum/>}/>}></Route>
        <Route path="/Mis_Actividades" element={<SessionCerrada element={<MisActividades/>}/>}></Route>
        <Route path="/Informacion_Personal_Alumno" element={<SessionCerrada element={<Info_alumno/>}/>}></Route>
        <Route path="/inscribirse" element={<SessionCerrada element={<Inscrip/>}/>}></Route>
        <Route path="/CronogramaAlumno" element={<SessionCerrada element={<CronoAlum/>}/>}></Route>
        <Route path="/reporte" element={<SessionCerrada element={<Reporte/>}/>}></Route>
      </Routes>
    </header>
    
  )
}

export default App;