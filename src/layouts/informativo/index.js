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
import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import ListSubheader from "@mui/material/ListSubheader";
// import List from "@mui/material/List";
// Material Dashboard 2 React components
import DashboardLayout from "elementos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "elementos/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
// Images
import Icon from "@mui/material/Icon";
import backgroundImage from "assets/images/bg-profile.jpeg";
import TextFormatter from "./component/TextFormatter";

function Informativo({ component, fields, before, next, actividad }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  const renderInput = (campos) =>
    campos.map((x) => {
      const out = <TextFormatter texto={x.valor} />;
      return out;
    });
  const renderInputs = () => {
    try {
      return <MDBox mb={2}> {renderInput(fields)}</MDBox>;
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
              {actividad ? (
                <>
                  <Link href={actividad} target="_blank">
                    <MDTypography variant="h5" fontWeight="small" color="secondary" mt={1}>
                      Actividad
                    </MDTypography>
                    <Icon fontSize="large" color="secondary">
                      assignment
                    </Icon>
                  </Link>
                  <br />
                </>
              ) : (
                ""
              )}
              <NavLink key={before} to={before}>
                <Icon fontSize="large" color="secondary">
                  arrow_back
                </Icon>
              </NavLink>
              <NavLink key={next} to={next}>
                <Icon fontSize="large" color="secondary">
                  arrow_forward
                </Icon>
              </NavLink>
            </MDBox>
          </Card>
        </MDBox>
      </Grid>
    </DashboardLayout>
  );
}

export default Informativo;
