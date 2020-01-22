import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Button = ({ onClick, children }) => (
  <div>
    <button type="button" onClick={onClick} className="button-inline">
      {children}
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export { Button };
