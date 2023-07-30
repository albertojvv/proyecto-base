import MDSnackbar from "components/MDSnackbar";
import { AdvertenciasController, setAdvertenciasOpen } from "./context";

function Advertencia() {
  const [controller, dispatch] = AdvertenciasController();
  const { type, title, content, open, dateTime, bgWhite } = controller;
  const colors = { 1: "success", 2: "info", 3: "warning", 4: "error" };
  const icons = { 1: "check", 2: "notifications", 3: "warning", 4: "warning" };
  return (
    <MDSnackbar
      color={colors[type]}
      icon={icons[type]}
      title={title}
      content={content}
      open={open}
      dateTime={dateTime}
      onClose={() => setAdvertenciasOpen(dispatch, false)}
      close={() => setAdvertenciasOpen(dispatch, false)}
      bgWhite={bgWhite}
    />
  );
}

export default Advertencia;
