import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

const Advertencias = createContext();
Advertencias.displayName = "Advertencias";

function reducer(state, action) {
  switch (action.type) {
    case "type": {
      return { ...state, type: action.value };
    }
    case "title": {
      return { ...state, title: action.value };
    }
    case "content": {
      return { ...state, content: action.value };
    }
    case "open": {
      return { ...state, open: action.value };
    }
    case "datetime": {
      return { ...state, datetime: action.value };
    }
    case "bgWhite": {
      return { ...state, bgWhite: action.value };
    }
    default: {
      throw new Error(`No se puede realizar cambio de: ${action.type}`);
    }
  }
}
function AdvertenciasProvider({ children }) {
  const initialState = {
    title: "Cargando...",
    content: "Cargando...",
    open: false,
    type: 1,
    dateTime: " ",
    bgWhite: true,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <Advertencias.Provider value={value}>{children}</Advertencias.Provider>;
}
function AdvertenciasController() {
  const advertencias = useContext(Advertencias);
  if (!advertencias) {
    throw new Error("AdvertenciasController puede ser usado dentro de AdvertenciasProvider");
  }
  return advertencias;
}
AdvertenciasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setAdvertenciasTitle = (dispatch, value) => dispatch({ type: "title", value });
const setAdvertenciasContent = (dispatch, value) => dispatch({ type: "content", value });
const setAdvertenciasOpen = (dispatch, value) => dispatch({ type: "open", value });
const setAdvertenciasDatetime = (dispatch, value) => dispatch({ type: "datetime", value });
const setAdvertenciasBgWhite = (dispatch, value) => dispatch({ type: "bgwhite", value });
const setAdvertenciasType = (dispatch, value) => dispatch({ type: "type", value });
export {
  AdvertenciasProvider,
  AdvertenciasController,
  setAdvertenciasTitle,
  setAdvertenciasContent,
  setAdvertenciasOpen,
  setAdvertenciasDatetime,
  setAdvertenciasBgWhite,
  setAdvertenciasType,
};
