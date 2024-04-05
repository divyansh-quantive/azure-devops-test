import React, { useEffect } from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    SDK.init();
  }, []);

  return (
    <div>
      <h1>Hello, Azure DevOps!</h1>
      <Link to="/test">Test</Link>
    </div>
  );
}

export default App;
