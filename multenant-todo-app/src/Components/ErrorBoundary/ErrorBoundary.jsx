import React from "react";
import "./ErrorBoundary.scss";
function ErrorBoundary({ message, color }) {
  return (
    <div className="error-boundary">
      <div className="error-boundary-container" style={{ color: color }}>
        <span className="error-message">{message}</span>
      </div>
    </div>
  );
}

export default ErrorBoundary;
