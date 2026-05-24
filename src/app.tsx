import "@mantine/core/styles.css";

import { Box, MantineProvider, Overlay, Stack } from "@mantine/core";
import { useState } from "react";
import { CropSelector } from "./components/crop-selector";
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

  const handleReset = () => {
    if (frameSize) {
      reset(frameSize);
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      {overlay && <Overlay backgroundOpacity={0} zIndex={1000} />}
      <Stack h="100vh" display="flex" gap={0}>
        <Box px="xl" py="md">
          <VideoInput value={videoPath} onChange={changeVideoPath} onChangeOverlay={setOverlay} />
        </Box>
        <CropSelector
          loading={loading}
          disabled={!videoPath}
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
