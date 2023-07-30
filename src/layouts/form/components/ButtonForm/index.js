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
// import { useLocation } from "react-router-dom";
// @mui material components
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
// import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";

function ButtonForm({
  funcion,
  funcionAdicional,
  name,
  data,
  dataAdicional,
  posicion,
  action,
  color,
  width,
}) {
  const eliminate = () => {
    data.splice(posicion, 1);
  };
  const addData = () => {
    data.push(dataAdicional);
  };
  const defFuncion = () => {
    if (funcion !== undefined) {
      funcion();
    } else {
      if (action === "add") {
        addData();
      }
      if (action === "eliminate") {
        eliminate();
        funcionAdicional[0]();
      }
    }
  };
  return (
    <>
      <Divider sx={{ bgcolor: "secondary.dark" }} />
      <ListItem>
        <MDButton name={name} onClick={defFuncion} variant="gradient" color={color} width={width}>
          {name}
        </MDButton>
      </ListItem>
    </>
  );
}
ButtonForm.defaultProps = {
  funcion: undefined,
  color: "info",
};
ButtonForm.protoTypes = {
  funcion: PropTypes.any,
  funcionAdicional: PropTypes.any,
  name: PropTypes.any,
  data: PropTypes.any,
  dataAdicional: PropTypes.any,
  action: PropTypes.any,
  posicion: PropTypes.any,
  width: PropTypes.any,
};

export default ButtonForm;
