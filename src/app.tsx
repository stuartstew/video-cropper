import "@mantine/core/styles.css";

import { Box, MantineProvider, Stack } from "@mantine/core";
import { FrameCrop } from "./components/frame-crop";
import { ROIInput } from "./components/roi-input";
import { SaveButton } from "./components/save-button";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";

const App = () => {
  const { x, y, width, height, changeX, changeY, changeWidth, changeHeight } = useCrop(600, 400);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h="100vh" display="flex" gap={0}>
        <VideoInput />
        <FrameCrop />
        <Box px="xl" pt="md">
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
        </Box>
        <Box px="xl" pt="md" pb="md">
          <SaveButton />
        </Box>
      </Stack>
    </MantineProvider>
  );
};

export default App;
