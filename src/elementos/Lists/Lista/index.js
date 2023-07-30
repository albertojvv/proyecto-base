import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// react-router-dom components
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React example components
import SidenavCollapse from "elementos/Sidenav/SidenavCollapse";

import { collapseIconBox, collapseIcon } from "elementos/Sidenav/styles/sidenavCollapse";

function Listas({
  textColor,
  nombreModulo,
  icono,
  acciones,
  collapseName,
  darkMode,
  whiteSidenav,
  transparentSidenav,
  tipo,
  ruta,
  link,
  llave,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const renderRoutes = acciones.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;
    const comparatorCollapse = collapseName.split("/");
    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <MDBox mx={3}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === comparatorCollapse[comparatorCollapse.length - 1]}
              noCollapse={noCollapse}
            />
          </MDBox>
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <MDBox mx={3}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === comparatorCollapse[comparatorCollapse.length - 1]}
            />
          </MDBox>
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    }
    return returnValue;
  });
  const renderField = () => {
    const comparatorCollapse = collapseName.split("/");
    if (tipo !== "modulo") {
      if (tipo === "divider") {
        return (
          <Divider
            key={llave}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return link ? (
        <Link
          href={link}
          key={llave}
          target="_blank"
          rel="noreferrer"
          sx={{
            textDecoration: "none",
          }}
        >
          <SidenavCollapse
            name={nombreModulo}
            icon={icono}
            active={llave === comparatorCollapse[comparatorCollapse.length - 1]}
          />
        </Link>
      ) : (
        <NavLink key={llave} to={ruta}>
          <SidenavCollapse
            name={nombreModulo}
            icon={icono}
            active={llave === comparatorCollapse[comparatorCollapse.length - 1]}
          />
        </NavLink>
      );
    }
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <MDTypography
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            ml={1.2}
          >
            <ListItemIcon
              sx={(theme) => collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode })}
            >
              {typeof icono === "string" ? (
                <Icon sx={(theme) => collapseIcon(theme)}>{icono}</Icon>
              ) : (
                icono
              )}
            </ListItemIcon>
          </MDTypography>
          <MDTypography
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            ml={1}
          >
            {nombreModulo}
          </MDTypography>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderRoutes}
          </List>
        </Collapse>
      </>
    );
  };
  return <List> {renderField()} </List>;
}
Listas.defaultProps = {
  link: "",
  ruta: "",
};
Listas.propTypes = {
  ruta: PropTypes.string,
  link: PropTypes.string,
  nombreModulo: PropTypes.string.isRequired,
  llave: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  icono: PropTypes.objectOf(PropTypes.any).isRequired,
  textColor: PropTypes.string.isRequired,
  acciones: PropTypes.arrayOf(PropTypes.object).isRequired,
  collapseName: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  whiteSidenav: PropTypes.bool.isRequired,
  transparentSidenav: PropTypes.bool.isRequired,
};
export default Listas;
