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
import MDSnackbar from "components/MDSnackbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// API
import API from "api/Api";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [userName, setUserName] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const valueUserName = (data) => setUserName(data.target.value);
  const conectar = () => {
    const data = {
      username: userName.toString(),
    };
    API.post("/usuarios/recovery_password/", data).then((response) => {
      if (response.data.CODE === 1) {
        setNotificationTitle(response.data.MESSAGE);
        setNotificationMessage(response.data.DATA);
        openSuccessSB();
      } else if (response.data.CODE === 2) {
        setNotificationTitle(response.data.MESSAGE);
        setNotificationMessage(response.data.DATA);
        openInfoSB();
      } else if (response.data.CODE === 3) {
        setNotificationTitle(response.data.MESSAGE);
        setNotificationMessage(response.data.DATA);
        openWarningSB();
      } else if (response.data.CODE === 4) {
        setNotificationTitle(response.data.MESSAGE);
        setNotificationMessage(response.data.DATA);
        openErrorSB();
      }
    });
  };
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title={notificationTitle}
      content={notificationMessage}
      open={successSB}
      dateTime=" "
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title={notificationTitle}
      content={notificationMessage}
      open={infoSB}
      dateTime=" "
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="warning"
      title={notificationTitle}
      content={notificationMessage}
      open={warningSB}
      dateTime=" "
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title={notificationTitle}
      content={notificationMessage}
      open={errorSB}
      dateTime=" "
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
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
            Restablecer Contraseña
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
                required
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={conectar} variant="gradient" color="secondary" fullWidth>
                RECUPERAR
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
      {renderSuccessSB}
      {renderInfoSB}
      {renderWarningSB}
      {renderErrorSB}
    </BasicLayout>
  );
}

export default Basic;
