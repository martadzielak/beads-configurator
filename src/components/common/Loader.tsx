import React, { useEffect, useState } from "react";
import { LoaderOverlay, LoaderSpinner } from "../styles/Loader";

export const Loader: React.FC = () => (
  <LoaderOverlay>
    <LoaderSpinner />
  </LoaderOverlay>
);

export function useLoader(timeout = 1000) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);
  return loading;
}
