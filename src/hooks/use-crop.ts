import { useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const useCrop = (imageWidth: number, imageHeight: number) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const changeX = (value: number) => {
    const clampedValue = clamp(value, 0, imageWidth - 1);
    setX(clampedValue);
    setWidth(clamp(width, 1, imageWidth - clampedValue));
  };
  const changeY = (value: number) => {
    const clampedValue = clamp(value, 0, imageHeight - 1);
    setY(clampedValue);
    setHeight(clamp(height, 1, imageHeight - clampedValue));
  };
  const changeWidth = (value: number) => setWidth(clamp(value, 1, imageWidth - x));
  const changeHeight = (value: number) => setHeight(clamp(value, 1, imageHeight - y));

  return { x, y, width, height, changeX, changeY, changeWidth, changeHeight };
};
