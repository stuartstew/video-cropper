import { Image } from "@mantine/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { RefObject } from "react";
import ReactCrop, { type PercentCrop } from "react-image-crop";
import type { Frame } from "@/types/frame";
import { useContain } from "../hooks/use-contain";

import "react-image-crop/dist/ReactCrop.css";

type Props = {
  percentCrop?: PercentCrop;
  onChangePercentCrop: (value: PercentCrop) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  frameSize: Frame;
  imageKey: number;
};

export const Cropper = ({ percentCrop, onChangePercentCrop, containerRef, frameSize, imageKey }: Props) => {
  const { renderedWidth, renderedHeight } = useContain(containerRef, frameSize.width, frameSize.height);
  const imageUrl = convertFileSrc(frameSize.path);

  return (
    <ReactCrop
      crop={percentCrop}
      onChange={(_, value) => onChangePercentCrop(value)}
      style={{ height: renderedHeight, width: renderedWidth }}
      minWidth={1}
      minHeight={1}
      ruleOfThirds
    >
      <Image src={`${imageUrl}?t=${imageKey}`} />
    </ReactCrop>
  );
};
