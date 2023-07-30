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
// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import {
  AdvertenciasController,
  setAdvertenciasTitle,
  setAdvertenciasContent,
  setAdvertenciasType,
  setAdvertenciasOpen,
} from "layouts/advertencias/context";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// API
import API from "api/Api";

function singUp() {
  const dispatch = AdvertenciasController();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const valueUserName = (data) => setUserName(data.target.value);
  const valuePassword = (data) => setPassword(data.target.value);
  const registrar = () => {
    const data = {
      username: userName.toString(),
      password: password.toString(),
    };
    API.post("/usuarios/crear_usuario/", data).then((response) => {
      setAdvertenciasTitle(dispatch[1], response.data.MESSAGE);
      setAdvertenciasContent(dispatch[1], response.data.DATA);
      setAdvertenciasType(dispatch[1], response.data.CODE);
      setAdvertenciasOpen(dispatch[1], true);
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
            Nuevo Usuario
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                variant="standard"
                onChange={valueUserName}
                value={userName}
                fullWidth
              />
              <MDInput
                type="password"
                label="Contraseña"
                variant="standard"
                onChange={valuePassword}
                value={password}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={registrar} variant="gradient" color="dark" fullWidth>
                REGISTRAR
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Recordaste tu cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Acceder
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default singUp;
