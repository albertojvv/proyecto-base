import { useLocation } from "react-router-dom";

class Sesion {
  static validarUsuario = () => {
    if (!sessionStorage.getItem("sesion")) {
      window.location = "/";
    }
  };

  static cerrarSesion = () => {
    sessionStorage.clear();
    window.location = "/";
  };

  static pathName = () => {
    const pathSplit = useLocation().pathname.split("/");
    const pathGet = pathSplit[pathSplit.length - 1];
    const name = pathGet.replaceAll("_", " ");
    return name;
  };

  static pathLocation = () => useLocation().pathname.split("/").slice(1);
}
export default Sesion;
