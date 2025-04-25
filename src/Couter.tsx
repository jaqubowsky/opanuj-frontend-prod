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

  return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
};
