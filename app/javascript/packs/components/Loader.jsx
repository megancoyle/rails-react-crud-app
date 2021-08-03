import React from "react";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">...</span>
      </div>
    </div>
  );
};

export default Loader;
