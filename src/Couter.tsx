import { useFlag } from "@featurevisor/react";
import { useState } from "react";

const FEATURE_NAME = "showSetCountButton";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const isFeatureEnabled = useFlag(FEATURE_NAME, {
    country: new URLSearchParams(window.location.search).get("country"),
  });

  if (!isFeatureEnabled) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
};
