import "@mantine/core/styles.css";

import { Box, Group, MantineProvider, Overlay, Stack } from "@mantine/core";
import { useState } from "react";
import { FrameCrop } from "./components/frame-crop";
import { ResetButton } from "./components/reset-button";
import { ROIInput } from "./components/roi-input";
import { SaveButton } from "./components/save-button";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";
import { useFrameExtraction } from "./hooks/use-frame-extraction";
import type { ImageSize } from "./types/image-size";

const App = () => {
  const [overlay, setOverlay] = useState(false);
  const [frameSize, setFrameSize] = useState<ImageSize>();
  const {
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
  } = useCrop(frameSize?.width ?? 1, frameSize?.height ?? 1);

  const onChangeFrameSize = (size: ImageSize) => {
    setFrameSize(size);
    changeFrameSize(size.width, size.height);
  };

  const { videoPath, loading, frameUrl, changeVideoPath } = useFrameExtraction(onChangeFrameSize);

  return (
    <MantineProvider defaultColorScheme="dark">
      {overlay && <Overlay backgroundOpacity={0} zIndex={1000} />}
      <Stack h="100vh" display="flex" gap={0}>
        <Box px="xl" py="md">
          <VideoInput value={videoPath} onChange={changeVideoPath} onChangeOverlay={setOverlay} />
        </Box>
        <FrameCrop
          percentCrop={percentCrop}
          onChangePercentCrop={changePercentCrop}
          frameSize={frameSize}
          loading={loading}
          frameUrl={frameUrl}
        />
        <Group px="xl" pt="md" pb="lg" gap="md" align="flex-end">
          <ROIInput
            x={x}
            y={y}
            width={width}
            height={height}
            onChangeX={changeX}
            onChangeY={changeY}
            onChangeWidth={changeWidth}
            onChangeHeight={changeHeight}
          />
          <Box flex={1} />
          <ResetButton onClick={reset} />
          <SaveButton />
        </Group>
      </Stack>
    </MantineProvider>
  );
};

export default App;
