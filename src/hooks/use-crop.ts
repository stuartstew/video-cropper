import { useState } from "react";
import type { PercentCrop } from "react-image-crop";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const useCrop = (imgWidth: number, imgHeight: number) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(imgWidth);
  const [height, setHeight] = useState(imgHeight);
  const [percentCrop, setPercentCrop] = useState<PercentCrop>();

  const setPercentCropByPixel = (x: number, y: number, width: number, height: number) =>
    setPercentCrop({
      unit: "%",
      x: (x / imgWidth) * 100,
      y: (y / imgHeight) * 100,
      width: (width / imgWidth) * 100,
      height: (height / imgHeight) * 100,
    });

  const changePercentCrop = (value: PercentCrop) => {
    setPercentCrop(value);
    if (value.width === 0 || value.height === 0) {
      setX(0);
      setY(0);
      setWidth(imgWidth);
      setHeight(imgHeight);
    } else {
      setX(Math.round((value.x / 100) * imgWidth));
      setY(Math.round((value.y / 100) * imgHeight));
      setWidth(Math.round((value.width / 100) * imgWidth));
      setHeight(Math.round((value.height / 100) * imgHeight));
    }
  };

  const changeX = (value: number) => {
    const newX = clamp(value, 0, imgWidth - 1);
    setX(newX);
    const newWidth = clamp(width, 1, imgWidth - newX);
    setWidth(newWidth);
    setPercentCropByPixel(newX, y, newWidth, height);
  };
  const changeY = (value: number) => {
    const newY = clamp(value, 0, imgHeight - 1);
    setY(newY);
    const newHeight = clamp(height, 1, imgHeight - newY);
    setHeight(newHeight);
    setPercentCropByPixel(x, newY, width, newHeight);
  };
  const changeWidth = (value: number) => {
    const newWidth = clamp(value, 1, imgWidth - x);
    setWidth(newWidth);
    setPercentCropByPixel(x, y, newWidth, height);
  };
  const changeHeight = (value: number) => {
    const newHeight = clamp(value, 1, imgHeight - y);
    setHeight(newHeight);
    setPercentCropByPixel(x, y, width, newHeight);
  };

  const reset = () => {
    setX(0);
    setY(0);
    setWidth(imgWidth);
    setHeight(imgHeight);
    setPercentCrop(undefined);
  };

  const changeFrameSize = (width: number, height: number) => {
    setX(0);
    setY(0);
    setWidth(width);
    setHeight(height);
    setPercentCrop(undefined);
  };

  return {
    x,
    y,
    width,
    height,
    changeX,
    changeY,
    changeWidth,
    changeHeight,
    percentCrop,
    changePercentCrop,
    reset,
    changeFrameSize,
  };
};
