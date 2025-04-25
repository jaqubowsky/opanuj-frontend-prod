import { FeaturevisorProvider } from "@featurevisor/react";
import { createInstance } from "@featurevisor/sdk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const envName = import.meta.env.VITE_ENV_NAME || "development";
const featurevisor = createInstance({
  datafileUrl: `${import.meta.env.VITE_FEATUREVISOR_DATAFILE_URL}/${envName}/datafile-tag-all.json`,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FeaturevisorProvider instance={featurevisor}>
      <App />
    </FeaturevisorProvider>
  </StrictMode>
);
