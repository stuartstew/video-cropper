import type { ImageSize } from "@tauri-apps/api/image";
import type { RefObject } from "react";
import ReactCrop, { type PercentCrop } from "react-image-crop";
import { useContain } from "../hooks/use-contain";

import "react-image-crop/dist/ReactCrop.css";
import { Box, LoadingOverlay } from "@mantine/core";

type Props = {
  percentCrop?: PercentCrop;
  onChangePercentCrop: (value: PercentCrop) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  frameSize: ImageSize;
  loading: boolean;
  children?: React.ReactNode;
};

export const Cropper = ({ percentCrop, onChangePercentCrop, containerRef, frameSize, loading, children }: Props) => {
  const { renderedWidth, renderedHeight } = useContain(containerRef, frameSize.width, frameSize.height);

  return (
    <Box pos="relative" h={renderedHeight} w={renderedWidth}>
      <LoadingOverlay visible={loading} zIndex={1000} w="100%" h="100%" />
      <ReactCrop
        crop={percentCrop}
        onChange={(_, value) => onChangePercentCrop(value)}
        disabled={loading}
        style={{ height: "100%", width: "100%" }}
        minWidth={1}
        minHeight={1}
        ruleOfThirds
      >
        {children}
      </ReactCrop>
    </Box>
  );
};
