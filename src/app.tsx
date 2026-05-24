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
  const { crop, percentCrop, changeCrop, changePercentCrop, reset } = useCrop(frameSize ?? { width: 0, height: 0 });

  const onChangeFrameSize = (size: ImageSize) => {
    setFrameSize(size);
    reset(size);
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
          <ROIInput crop={crop} onChangeCrop={changeCrop} />
          <Box flex={1} />
          <ResetButton onClick={() => reset(frameSize ?? { width: 0, height: 0 })} />
          <SaveButton />
        </Group>
      </Stack>
    </MantineProvider>
  );
};

export default App;
