import "@mantine/core/styles.css";

import { Box, Group, MantineProvider, Overlay, Stack } from "@mantine/core";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { FrameCrop } from "./components/frame-crop";
import { ResetButton } from "./components/reset-button";
import { ROIInput } from "./components/roi-input";
import { SaveButton } from "./components/save-button";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";
import type { Frame } from "./types/frame";

const App = () => {
  const [videoPath, setVideoPath] = useState<string>();
  const [overlay, setOverlay] = useState(false);
  const [frameSize, setFrameSize] = useState<Frame>();
  const [loading, setLoading] = useState(false);
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

  const [imageKey, setImageKey] = useState(() => Date.now());
  const reloadImage = () => setImageKey(Date.now());

  const handleChangeVideoPath = (value?: string) => {
    if (!value) return;

    setVideoPath(value);
    setLoading(true);

    invoke<Frame>("fetch_first_frame", { path: value })
      .then((frameSize) => {
        setFrameSize(frameSize);
        changeFrameSize(frameSize.width, frameSize.height);
        reloadImage();
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      {overlay && <Overlay backgroundOpacity={0} zIndex={1000} />}
      <Stack h="100vh" display="flex" gap={0}>
        <Box px="xl" py="md">
          <VideoInput value={videoPath} onChange={handleChangeVideoPath} onChangeOverlay={setOverlay} />
        </Box>
        <FrameCrop
          percentCrop={percentCrop}
          onChangePercentCrop={changePercentCrop}
          frameSize={frameSize}
          loading={loading}
          imageKey={imageKey}
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
