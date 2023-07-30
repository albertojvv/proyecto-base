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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(
  ({ error, success, disabled, widthInput, marginValue, ...rest }, ref) => (
    <MDInputRoot
      {...rest}
      ref={ref}
      ownerState={{
        error,
        success,
        disabled,
        widthInput,
        marginValue,
      }}
    />
  )
);

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  widthInput: "100%",
  marginValue: "0 10px !important",
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  widthInput: PropTypes.string,
  marginValue: PropTypes.string,
};

export default MDInput;
