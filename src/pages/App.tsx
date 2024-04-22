import React, { useEffect, useState } from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Link } from "react-router-dom";
import {
  IExtensionDataService,
  CommonServiceIds,
} from "azure-devops-extension-api";

function App() {
  const [dataService, setDataService] = useState<IExtensionDataService | null>(
    null
  );

  useEffect(() => {
    SDK.init().then(() => {
      SDK.getService<IExtensionDataService>(
        CommonServiceIds.ExtensionDataService
      ).then((service) => {
        setDataService(service);
      });
    });
  }, []);

  const fetchCurrentUser = () => {
    const currentUser = SDK.getUser();
    console.log(currentUser);
  };

  const saveData = async () => {
    const currentUser = SDK.getUser();
    const extensionId = SDK.getExtensionContext().id;
    const accessToken = await SDK.getAccessToken();

    if (dataService && currentUser) {
      let dataId = `user_data_${currentUser.id}`;

      // Storing data
      await dataService
        .getExtensionDataManager(extensionId, accessToken)
        .then((service) => {
          service.setValue(dataId, { key: "value" }, { scopeType: "User" });
        });
      console.log("Data saved for user ", currentUser.id);
    }
  };

  const fetchData = async () => {
    const currentUser = SDK.getUser();
    const extensionId = SDK.getExtensionContext().id;
    const accessToken = await SDK.getAccessToken();

    if (dataService && currentUser) {
      let dataId = `user_data_${currentUser.id}`;

      const dataManager = await dataService.getExtensionDataManager(
        extensionId,
        accessToken
      );
      const value = await dataManager.getValue(dataId, { scopeType: "User" });

      console.log("Data fetched for user", currentUser.id, ": ", value);
    }
  };

  return (
    <div>
      <h1>Hello, Azure DevOps!</h1>
      <button onClick={() => fetchCurrentUser()}>Fetch User</button>
      <button onClick={() => saveData()}>Save Data</button>
      <button onClick={() => fetchData()}>Fetch Data</button>
      <Link to="/test">Test</Link>
    </div>
  );
}

export default App;
