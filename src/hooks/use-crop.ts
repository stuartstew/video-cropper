import { useState } from "react";
import type { Crop, PercentCrop } from "react-image-crop";
import type { ImageSize } from "@/types/image-size";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isCropEqual = (a: Crop, b: Crop) =>
  a.unit === b.unit && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;

export const useCrop = (frameSize: ImageSize) => {
  const [crop, setCrop] = useState<Crop>({ unit: "px", x: 0, y: 0, width: 0, height: 0 });
  const [percentCrop, setPercentCrop] = useState<PercentCrop>();

  const pixelToPercent = (crop: Crop): PercentCrop => ({
    unit: "%",
    x: (crop.x / frameSize.width) * 100,
    y: (crop.y / frameSize.height) * 100,
    width: (crop.width / frameSize.width) * 100,
    height: (crop.height / frameSize.height) * 100,
  });

  const percentToPixel = (percentCrop: PercentCrop): Crop =>
    percentCrop.width === 0 || percentCrop.height === 0
      ? { unit: "px", x: 0, y: 0, width: frameSize.width, height: frameSize.height }
      : {
          unit: "px",
          x: Math.round((percentCrop.x / 100) * frameSize.width),
          y: Math.round((percentCrop.y / 100) * frameSize.height),
          width: Math.round((percentCrop.width / 100) * frameSize.width),
          height: Math.round((percentCrop.height / 100) * frameSize.height),
        };

  const changeCrop = (value: Crop) => {
    if (isCropEqual(value, crop)) {
      return;
    }
    const newX = clamp(value.x, 0, frameSize.width - 1);
    const newY = clamp(value.y, 0, frameSize.height - 1);
    const newWidth = clamp(value.width, 1, frameSize.width - newX);
    const newHeight = clamp(value.height, 1, frameSize.height - newY);
    const newCrop: Crop = { unit: "px", x: newX, y: newY, width: newWidth, height: newHeight };
    setCrop(newCrop);
    setPercentCrop(pixelToPercent(newCrop));
  };

  const changePercentCrop = (value: PercentCrop) => {
    setPercentCrop(value);
    setCrop(percentToPixel(value));
  };

  const reset = (frameSize: ImageSize) => {
    setCrop({ unit: "px", x: 0, y: 0, width: frameSize.width, height: frameSize.height });
    setPercentCrop(undefined);
  };

  return {
    crop,
    percentCrop,
    changeCrop,
    changePercentCrop,
    reset,
  };
};
