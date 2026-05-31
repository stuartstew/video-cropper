import type { ImageSize } from "@tauri-apps/api/image";
import type { RefObject } from "react";
import ReactCrop, { type PercentCrop } from "react-image-crop";
import { useContain } from "../hooks/use-contain";

import "react-image-crop/dist/ReactCrop.css";

type Props = {
  percentCrop?: PercentCrop;
  onChangePercentCrop: (value: PercentCrop) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  frameSize: ImageSize;
  children?: React.ReactNode;
};

export const Cropper = ({ percentCrop, onChangePercentCrop, containerRef, frameSize, children }: Props) => {
  const { renderedWidth, renderedHeight } = useContain(containerRef, frameSize.width, frameSize.height);

  return (
    <ReactCrop
      crop={percentCrop}
      onChange={(_, value) => onChangePercentCrop(value)}
      style={{ height: renderedHeight, width: renderedWidth }}
      minWidth={1}
      minHeight={1}
      ruleOfThirds
    >
      {children}
    </ReactCrop>
  );
};
