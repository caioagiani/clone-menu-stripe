import { useState, useCallback, useLayoutEffect } from "react";

const getDimensions = (element) => element.getBoundingClientRect();

export function useDimensions(responsive = true) {
  const [dimensions, setDimensions] = useState(null);
  const [element, setElement] = useState(null);

  const hook = useCallback((e) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimentsions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };

      updateDimentsions();

      if (responsive) {
        window.addEventListener("resize", updateDimentsions);

        return () => {
          window.removeEventListener("resize", updateDimentsions);
        };
      }
    }
  }, [element, hook, responsive]);

  return [hook, dimensions, element];
}
