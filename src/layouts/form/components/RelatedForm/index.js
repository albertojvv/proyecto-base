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
import PropTypes from "prop-types";

import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
import InputForm from "layouts/form/components/InputForm";
import ButtonForm from "layouts/form/components/ButtonForm";

function RelatedForm({ relacionado, funcion, value }) {
  const [fields, setFields] = useState([]);
  const [design, setDesign] = useState("");
  const [contador, setContador] = useState(0);
  // RENDERIZAR INPUTS Y BOTON
  const renderInputs = () => {
    setDesign(
      fields.map((y) => {
        const outDef = y.map((x) => {
          const salidaTmpo = (
            <ListItem>
              <InputForm datos={x} funcion={funcion} value={value} />
            </ListItem>
          );
          return salidaTmpo;
        });
        return (
          <>
            {outDef}
            Opciones
            <ButtonForm
              name="Eliminar"
              action="eliminate"
              funcionAdicional={[renderInputs, setFields]}
              data={fields}
              color="error"
              width={100}
            />
          </>
        );
      })
    );
  };
  const addData = () => {
    fields.push(
      relacionado.map((x) => {
        const out = {
          contador: {
            id_field: x.id_field,
            key: x.key,
            label: x.label,
            name: x.name,
            order: x.order,
            secondary_field: x.secondary_field,
            type: x.type,
            width: x.width,
          },
        };
        setContador(contador + 1);
        return out;
      })
    );
    renderInputs();
  };
  return (
    <>
      {design}
      <ButtonForm funcion={addData} name="AÑADIR" />
    </>
  );
}
RelatedForm.defaultProps = {
  relacionado: [],
};
RelatedForm.protoTypes = {
  relacionado: PropTypes.any,
  funcion: PropTypes.any,
  value: PropTypes.any,
};

export default RelatedForm;
