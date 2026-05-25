import "@mantine/core/styles.css";

import { Box, MantineProvider, Stack } from "@mantine/core";
import { useState } from "react";
import { CropSelector } from "./components/crop-selector";
import { VideoInput } from "./components/video-input";
import { useCrop } from "./hooks/use-crop";
import { useFrameExtraction } from "./hooks/use-frame-extraction";
import type { ImageSize } from "./types/image-size";

const App = () => {
  const [frameSize, setFrameSize] = useState<ImageSize>();
  const { crop, percentCrop, changeCrop, changePercentCrop, reset } = useCrop(frameSize ?? { width: 0, height: 0 });

  const onChangeFrameSize = (size: ImageSize) => {
    setFrameSize(size);
    reset(size);
  };

  const { videoFile, loading, frameUrl, changeVideoFile } = useFrameExtraction(onChangeFrameSize);

  const handleReset = () => {
    if (frameSize) {
      reset(frameSize);
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h="100vh" display="flex" gap={0}>
        <Box px="xl" py="md">
          <VideoInput value={videoFile} onChange={changeVideoFile} />
        </Box>
        <CropSelector
          loading={loading}
          disabled={!videoFile}
          frameSize={frameSize}
          frameUrl={frameUrl}
          crop={crop}
          percentCrop={percentCrop}
          onChangeCrop={changeCrop}
          onChangePercentCrop={changePercentCrop}
          onReset={handleReset}
        />
      </Stack>
    </MantineProvider>
  );
};

export default App;
