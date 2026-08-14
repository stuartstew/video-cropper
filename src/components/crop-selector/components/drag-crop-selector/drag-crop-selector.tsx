import { Center, Image } from "@mantine/core";
import type { ImageSize } from "@tauri-apps/api/image";
import { useRef } from "react";
import type { PercentCrop } from "react-image-crop";
import { Cropper } from "./components/cropper";

import "react-image-crop/dist/ReactCrop.css";

type Props = {
  percentCrop?: PercentCrop;
  onChangePercentCrop: (value: PercentCrop) => void;
  frameSize?: ImageSize;
  loading: boolean;
  frameUrl?: string;
};

export const DragCropSelector = ({ percentCrop, onChangePercentCrop, frameSize, loading, frameUrl }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Center ref={containerRef} display="flex" flex={1} bg="#000" style={{ overflow: "hidden" }}>
      {frameSize && (
        <Cropper
          percentCrop={percentCrop}
          onChangePercentCrop={onChangePercentCrop}
          containerRef={containerRef}
          frameSize={frameSize}
          loading={loading}
        >
          <Image src={frameUrl} />
        </Cropper>
      )}
    </Center>
  );
};
