import { useStatus } from "@featurevisor/react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { Counter } from "./Couter";
import { Version } from "./Version";
import viteLogo from "/vite.svg";

function App() {
  const { isReady } = useStatus();

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Version />
    </>
  );
}

export default App;
