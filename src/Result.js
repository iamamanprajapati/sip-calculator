import React from "react";
import { handleDownload } from "./utils/useDownload";

const Result = ({ results }) => {
  return (
    <div className="result">
      <h2>Result:</h2>
      <button
        className="download-button"
        onClick={() => handleDownload(results)}
      >
        Download CSV
      </button>
    </div>
  );
};

export default Result;
