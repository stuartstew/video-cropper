import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { Box, Group, MantineProvider, Stack } from "@mantine/core";
import { useState } from "react";
import { CropButton } from "./components/crop-button";
import { DragCropSelector } from "./components/drag-crop-selector";
import { ManualCropInput } from "./components/manual-crop-input";
import { ResetButton } from "./components/reset-button";
import { VideoDropzone } from "./components/video-dropzone";
import { VideoTitleBar } from "./components/video-title-bar";
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

  const { videoFile, loading, frameUrl, changeVideoFile, closeVideoFile } = useFrameExtraction(onChangeFrameSize);

  const handleReset = () => {
    if (frameSize) {
      reset(frameSize);
    }
  };

  const disabled = !videoFile;
  const isDefault = !percentCrop || percentCrop.height === 0 || percentCrop.width === 0;

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h="100vh" display="flex" gap={0}>
        {!loading && videoFile ? (
          <>
            <VideoTitleBar videoName={videoFile.name} onClose={closeVideoFile} />
            <DragCropSelector
              percentCrop={percentCrop}
              onChangePercentCrop={changePercentCrop}
              frameSize={frameSize}
              loading={loading}
              frameUrl={frameUrl}
            />
          </>
        ) : (
          <VideoDropzone onChangeVideoFile={changeVideoFile} loading={loading} />
        )}
        <Group px="xl" pt="md" pb="lg" gap="md" align="flex-end">
          <ManualCropInput crop={crop} onChangeCrop={changeCrop} disabled={loading || disabled} />
          <Box flex={1} />
          <ResetButton onClick={handleReset} disabled={loading || disabled || isDefault} />
          <CropButton disabled={loading || disabled} />
        </Group>
      </Stack>
    </MantineProvider>
  );
};

export default App;
