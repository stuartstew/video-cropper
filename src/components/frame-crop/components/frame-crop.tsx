import { Center, Image } from "@mantine/core";
import { useState } from "react";
import ReactCrop, { type PercentCrop } from "react-image-crop";
import { useContain } from "../hooks/use-contain";

import "react-image-crop/dist/ReactCrop.css";

type Props = {
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
};

export const FrameCrop = ({ imgSrc, imgWidth, imgHeight }: Props) => {
  const [percentCrop, setPercentCrop] = useState<PercentCrop>();
  const { containerRef, renderedWidth, renderedHeight } = useContain(imgWidth, imgHeight);

  return (
    <Center ref={containerRef} display="flex" flex={1} bg="#000" style={{ overflow: "hidden" }}>
      <ReactCrop
        crop={percentCrop}
        onChange={(_, value) => setPercentCrop(value)}
        style={{ height: renderedHeight, width: renderedWidth }}
        minWidth={1}
        minHeight={1}
        ruleOfThirds
      >
        <Image src={imgSrc} />
      </ReactCrop>
    </Center>
  );
};
