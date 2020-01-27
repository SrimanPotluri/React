import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Button = ({ onClick, children, className }) => (
  <div>
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: "button-inline"
};

export { Button };
