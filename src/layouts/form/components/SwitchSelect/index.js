/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
import PropTypes from "prop-types";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";

function SwitchSelect({ accion, funcion }) {
  const [actionSwitch, setActionSwitch] = useState(false);
  // OPEN/CLOSE Acordeon
  const handleClick = () => {
    setActionSwitch(!actionSwitch);
    const data = {
      target: {
        name: accion,
        value: !actionSwitch,
      },
    };
    funcion(data);
  };
  return (
    <ListItemButton onClick={handleClick}>
      <Switch checked={actionSwitch} onChange={handleClick} inputProps={{ name: accion }} />
      <ListItemText primary={accion} />
      {actionSwitch ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
}
SwitchSelect.defaultProps = {
  accion: "Acción",
  funcion: () => undefined,
};
SwitchSelect.protoTypes = {
  accion: PropTypes.any,
  funcion: PropTypes.any,
};

export default SwitchSelect;
