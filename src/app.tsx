import "@mantine/core/styles.css";

import { Box, Group, MantineProvider, Overlay, Stack } from "@mantine/core";
import { useState } from "react";
import { FrameCrop } from "./components/frame-crop";
import { ResetButton } from "./components/reset-button";
import { ROIInput } from "./components/roi-input";
import { SaveButton } from "./components/save-button";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";

const App = () => {
  const { x, y, width, height, changeX, changeY, changeWidth, changeHeight, percentCrop, changePercentCrop, reset } =
    useCrop(600, 400);

  const [videoPath, setVideoPath] = useState<string>();
  const [overlay, setOverlay] = useState(false);

  return (
    <MantineProvider defaultColorScheme="dark">
      {overlay && <Overlay backgroundOpacity={0} zIndex={1000} />}
      <Stack h="100vh" display="flex" gap={0}>
        <Box px="xl" py="md">
          <VideoInput value={videoPath} onChange={setVideoPath} onChangeOverlay={setOverlay} />
        </Box>
        <FrameCrop
          percentCrop={percentCrop}
          onChangePercentCrop={changePercentCrop}
          imgSrc="https://placehold.co/600x400"
          imgWidth={600}
          imgHeight={400}
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
