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

import { Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  AdvertenciasController,
  setAdvertenciasTitle,
  setAdvertenciasContent,
  setAdvertenciasType,
  setAdvertenciasOpen,
} from "layouts/advertencias/context";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// API
import API from "api/Api";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Login() {
  const dispatch = AdvertenciasController();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const valueUserName = (data) => setUserName(data.target.value);
  const valuePassword = (data) => setPassword(data.target.value);
  const conectar = () => {
    const data = {
      username: userName.toString(),
      password: password.toString(),
    };
    API.post("/usuarios/acceso/", data).then((response) => {
      if (response.data.CODE === 1) {
        setAdvertenciasTitle(dispatch[1], response.data.MESSAGE);
        setAdvertenciasContent(
          dispatch[1],
          "Será redigido a la pagina principal del portal en un momento."
        );
        setAdvertenciasType(dispatch[1], response.data.CODE);
        setAdvertenciasOpen(dispatch[1], true);
        const dataResponse = JSON.parse(response.data.DATA);
        setTimeout(() => {
          sessionStorage.setItem("sesion", response.data.DATA);
          if (dataResponse.tipo_usuario === 0) {
            window.location = "/dashboard";
          }
          if (dataResponse.tipo_usuario === 1) {
            window.location = "/perfil";
          }
          if (dataResponse.tipo_usuario < 0 || dataResponse.tipo_usuario > 1) {
            window.location = "/";
          }
        }, 2000);
      } else {
        setAdvertenciasTitle(dispatch[1], response.data.MESSAGE);
        setAdvertenciasContent(dispatch[1], response.data.DATA);
        setAdvertenciasType(dispatch[1], response.data.CODE);
        setAdvertenciasOpen(dispatch[1], true);
      }
    });
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="secondary"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            INGRESAR
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre de Usuario"
                fullWidth
                onChange={valueUserName}
                value={userName}
                marginValue="0px"
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                fullWidth
                onChange={valuePassword}
                value={password}
                marginValue="0px"
                required
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={conectar} variant="gradient" color="secondary" fullWidth>
                ACCEDER
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Olvidaste tu contraseña?{" "}
                <MDTypography
                  component={Link}
                  to="/recovery"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Restablecer
                </MDTypography>
              </MDTypography>
              <MDTypography variant="button" color="text">
                ¿Eres nuevo?{" "}
                <MDTypography
                  component={Link}
                  to="/registrarse"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Registrarse
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
