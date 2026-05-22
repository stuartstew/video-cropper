import "@mantine/core/styles.css";

import { Box, Group, MantineProvider, Stack } from "@mantine/core";
import { FrameCrop } from "./components/frame-crop";
import { ResetButton } from "./components/reset-button";
import { ROIInput } from "./components/roi-input";
import { SaveButton } from "./components/save-button";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";

const App = () => {
  const { x, y, width, height, changeX, changeY, changeWidth, changeHeight, percentCrop, changePercentCrop, reset } =
    useCrop(600, 400);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h="100vh" display="flex" gap={0}>
        <VideoInput />
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
