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
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
// import { useState } from "react";
// API
// import API from "api/Api";

function InputForm({ datos, funcion, value }) {
  return (
    <MDInput
      type={datos.type ? datos.type : "text"}
      label={datos.label ? datos.label : " "}
      key={`${datos.name}-${datos.count}`}
      id={datos.id_field ? `${datos.id_field}-${datos.count}` : ""}
      variant={datos.type === "foreignField" ? "outlined" : "standard"}
      onChange={(e) => funcion(e)}
      value={value[`${datos.name}-${datos.count}`]}
      name={`${datos.name}-${datos.count}`}
      multiline={datos.type === "textArea"}
      rows={datos.type === "textArea" ? 5 : ""}
      widthInput={datos.width ? datos.width : undefined}
    />
  );
}

InputForm.protoTypes = {
  datos: PropTypes.object,
  funcion: PropTypes.func,
  valor: PropTypes.any,
};

export default InputForm;
