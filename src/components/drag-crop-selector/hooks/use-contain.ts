import { type RefObject, useEffect, useState } from "react";

export const useContain = (containerRef: RefObject<HTMLDivElement | null>, imgWidth: number, imgHeight: number) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateContainerSize = () => {
    const container = containerRef.current;
    if (!container) return;
    setContainerWidth(container.clientWidth);
    setContainerHeight(container.clientHeight);
  };

  useEffect(() => {
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
    // biome-ignore lint/correctness/useExhaustiveDependencies: React Compiler handles memoization
  }, [updateContainerSize]);

  const scale = Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
  const renderedWidth = imgWidth * scale;
  const renderedHeight = imgHeight * scale;

  return { containerRef, renderedWidth, renderedHeight };
};
