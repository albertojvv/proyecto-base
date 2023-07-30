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
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// API
import API from "api/Api";
// @mui material components
import Card from "@mui/material/Card";
// import ListSubheader from "@mui/material/ListSubheader";
// import List from "@mui/material/List";
// Material Dashboard 2 React components
import DashboardLayout from "elementos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elementos/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import {
  AdvertenciasController,
  setAdvertenciasTitle,
  setAdvertenciasContent,
  setAdvertenciasType,
  setAdvertenciasOpen,
} from "layouts/advertencias/context";
// Images
import backgroundImage from "assets/images/bg-profile.jpeg";
import SwitchSelect from "./components/SwitchSelect";
import RelatedForm from "./components/RelatedForm";

function Form({ component, fields, request }) {
  const [dataInputs, setData] = useState([]);
  const { pathname } = useLocation();
  const dispatch = AdvertenciasController();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    setData([]);
  }, [pathname]);
  // Setting page scroll to 0 when changing the route
  const setDataInputValue = (data) => {
    const tmp = [...dataInputs];
    let valor = tmp.find((valores) => valores.name === data.target.name);
    if (valor !== undefined) {
      valor.value = data.target.value;
    } else {
      valor = {
        name: data.target.name,
        value: data.target.value,
      };
      tmp.push(valor);
    }
    setData(tmp);
  };
  const registrar = () => {
    API.post(request, dataInputs).then((response) => {
      setAdvertenciasTitle(dispatch[1], response.data.MESSAGE);
      setAdvertenciasContent(dispatch[1], response.data.DATA);
      setAdvertenciasType(dispatch[1], response.data.CODE);
      setAdvertenciasOpen(dispatch[1], true);
    });
  };
  const renderInput = (campos) =>
    campos.map((x) => {
      let out = null;
      if (!x.secondary_field) {
        if (x.type === "foreignField") {
          out = x.label;
        } else if (x.type === "radio") {
          out = <SwitchSelect accion={x.name} funcion={setDataInputValue} />;
        } else {
          out = (
            <MDInput
              type={x.type ? x.type : "text"}
              label={x.label ? x.label : " "}
              key={x.key ? x.key : ""}
              variant={x.type === "foreignField" ? "outlined" : "standard"}
              onChange={setDataInputValue}
              value={dataInputs[x.name]}
              name={x.name}
              multiline={x.type === "textArea"}
              rows={x.type === "textArea" ? 5 : ""}
              widthInput={x.width ? x.width : undefined}
            />
          );
        }
      }
      return out;
    });
  const renderSecondaryInputs = (campos) => {
    const dataSending = campos.filter((y) => y.secondary_field);
    return <RelatedForm relacionado={dataSending} funcion={setDataInputValue} value={dataInputs} />;
  };
  const renderInputs = () => {
    try {
      return (
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            {renderInput(fields)}
            {renderSecondaryInputs(fields)}
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton onClick={registrar} variant="gradient" color="dark">
              CREAR
            </MDButton>
          </MDBox>
        </MDBox>
      );
    } catch (e) {
      return "No hay campos que mostrar";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} md={12} lg={12} mx="auto">
        <MDBox position="relative" mb={5}>
          <MDBox
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="20rem"
            borderRadius="xl"
            sx={{
              backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.info.main, 0.6),
                  rgba(gradients.info.state, 0.6)
                )}, url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
              overflow: "hidden",
            }}
          />
          <Card
            sx={{
              position: "relative",
              mt: -30,
              mx: 10,
              py: 2,
              px: 2,
            }}
          >
            <MDBox
              variant="gradient"
              bgColor="dark"
              shadow="lg"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                {component}
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {renderInputs()}
            </MDBox>
          </Card>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
}

export default Form;
