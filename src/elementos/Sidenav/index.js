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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { List } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Sidenav
import SidenavRoot from "elementos/Sidenav/SidenavRoot";
import sidenavLogoLabel from "elementos/Sidenav/styles/sidenav";
// import Listas from "elementos/Lists/Lista";
import Sesion from "funciones/sesion";
import Lista from "elementos/Lists/Lista";

// Views
import Tables from "layouts/tables";
import Form from "layouts/form";
import Notifications from "layouts/notifications";
import Register from "layouts/sign-up";
import Informativo from "layouts/informativo";
// API
import API from "api/Api";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const [rutas, setRutas] = useState([]);
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);
  // Routes Changing
  const validationConst = (x, y) => {
    const val = x.map((z) => {
      if (z.nombreModulo === y.nombreModulo) {
        return false;
      }
      return true;
    });
    if (val.includes(false)) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    const data = sessionStorage.getItem("sesion")
      ? JSON.parse(sessionStorage.getItem("sesion"))
      : { id: "" };
    API.post("/utilidades/getModulos", data).then((response) => {
      const value = JSON.parse(response.data.DATA);
      value.map((x) => {
        const accionesTmp = x.acciones.map((y) => {
          const outTmp = {
            key: y.key,
            name: y.name,
            route: y.route,
            show: y.show,
            type: y.type,
            icon: <Icon fontSize={y.font_size_icon}>{y.icon}</Icon>,
          };
          if (y.component === "register") {
            outTmp.component = <Register component={y.name} fields={y.fields} />;
          }
          if (y.component === "form") {
            outTmp.component = <Form component={y.name} fields={y.fields} />;
          }
          if (y.component === "informativo") {
            outTmp.component = <Informativo component={y.name} fields={y.fields} />;
          }
          if (y.component === "tables") {
            outTmp.component = <Tables />;
          }
          if (y.component === "notifications") {
            outTmp.component = <Notifications />;
          }
          return outTmp;
        });
        const outPushTmp = {
          key: x.key,
          nombreModulo: x.nombreModulo,
          show: x.show,
          type: x.type,
          icon: <Icon fontSize={x.font_size_icon}>{x.icon}</Icon>,
          acciones: accionesTmp,
        };
        const validation = validationConst(routes, outPushTmp);
        if (validation) {
          routes.push(outPushTmp);
        }
        return outPushTmp;
      });
      setRutas(routes);
    });
  }, [rutas]);
  const renderizarLista = rutas.map(({ nombreModulo, acciones, icon, type, route, link, key }) => {
    if (nombreModulo !== undefined) {
      return (
        <li key={key}>
          <Lista
            nombreModulo={nombreModulo}
            icono={icon}
            textColor={textColor}
            acciones={acciones}
            collapseName={collapseName}
            darkMode={darkMode}
            whiteSidenav={whiteSidenav}
            transparentSidenav={transparentSidenav}
            tipo={type}
            ruta={route}
            link={link}
            llave={key}
          />
        </li>
      );
    }
    return null;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/dashboard" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderizarLista}</List>
      <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          onClick={Sesion.cerrarSesion}
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          Cerrar Sesion
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
