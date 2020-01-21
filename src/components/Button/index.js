import React from "react";
import "./index.css";

const Button = ({ onClick, children }) => (
  <div>
    <button type="button" onClick={onClick} className="button-inline">
      {children}
    </button>
  </div>
);

export { Button };
