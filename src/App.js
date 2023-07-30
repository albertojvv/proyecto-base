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

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "elementos/Sidenav";
import Configurator from "elementos/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Advertencia from "layouts/advertencias";
import { AdvertenciasProvider } from "layouts/advertencias/context";
// Views
import Tables from "layouts/tables";
import Form from "layouts/form/";
import Notifications from "layouts/notifications";
import Register from "layouts/sign-up";
import Informativo from "layouts/informativo";
// API
import API from "api/Api";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [rutas, setRutas] = useState(routes);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

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
            key: y.id,
            name: y.name,
            route: y.route,
            show: y.show,
            type: y.type,
            icon: <Icon fontSize={y.font_size_icon}>{y.icon}</Icon>,
          };
          if (y.component === "register") {
            outTmp.component = <Register component={y.name} fields={y.fields} />;
          }
          if (y.component === "informativo") {
            outTmp.component = (
              <Informativo
                component={`${y.name} ${y.descripcion}`}
                before={y.before}
                next={y.next}
                fields={y.fields}
                actividad={y.actividad}
              />
            );
          }

          if (y.component === "form") {
            outTmp.component = (
              <Form component={y.name} fields={y.fields} request={y.request} object={y} />
            );
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
  // Setting page scroll to 0 when changing the route
  const getRoutes = (renderRoutes) =>
    renderRoutes.map((route) => {
      if (route.route && route.type === "collapse") {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      if (route.type === "modulo") {
        return route.acciones.map((x) => (
          <Route exact path={x.route} element={x.component} key={x.key} />
        ));
      }
      return null;
    });
  const getRoutesSideNavBar = (renderRoutes) => {
    const routesTmp = [];
    renderRoutes.filter((route) => {
      if (route.show === true) {
        routesTmp.push(route);
      }
      return null;
    });
    return routesTmp;
  };
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  const renderIndex = (x) => {
    const out = (
      <AdvertenciasProvider>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          <Advertencia />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="MENU"
                routes={getRoutesSideNavBar(x)}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          <Routes>
            {getRoutes(x)}
            <Route
              path="*"
              element={<Navigate to={sessionStorage.getItem("sesion") ? { pathname } : "/login"} />}
            />
          </Routes>
        </ThemeProvider>
      </AdvertenciasProvider>
    );
    return out;
  };
  return <> {renderIndex(rutas)} </>;
}
