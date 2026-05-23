import { Center } from "@mantine/core";
import { useRef } from "react";
import type { PercentCrop } from "react-image-crop";
import type { Frame } from "@/types/frame";

import "react-image-crop/dist/ReactCrop.css";
import { Cropper } from "./components/cropper";

type Props = {
  percentCrop?: PercentCrop;
  onChangePercentCrop: (value: PercentCrop) => void;
  frameSize?: Frame;
  loading: boolean;
  imageKey: number;
};

export const FrameCrop = ({ percentCrop, onChangePercentCrop, frameSize, loading, imageKey }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Center ref={containerRef} display="flex" flex={1} bg="#000" style={{ overflow: "hidden" }}>
      {frameSize && !loading && (
        <Cropper
          percentCrop={percentCrop}
          onChangePercentCrop={onChangePercentCrop}
          containerRef={containerRef}
          frameSize={frameSize}
          imageKey={imageKey}
        />
      )}
    </Center>
  );
};
