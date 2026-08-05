import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { Box, Group, MantineProvider, Stack } from "@mantine/core";
import type { ImageSize } from "@tauri-apps/api/image";
import { useState } from "react";
import { CompletedModal } from "./components/completed-modal";
import { CropButton } from "./components/crop-button";
import { DragCropSelector } from "./components/drag-crop-selector";
import { ManualCropInput } from "./components/manual-crop-input";
import { ProgressModal } from "./components/progress-modal";
import { ResetButton } from "./components/reset-button";
import { VideoDropzone } from "./components/video-dropzone";
import { VideoTitleBar } from "./components/video-title-bar";
import { useCrop } from "./hooks/use-crop";
import { useFrameExtraction } from "./hooks/use-frame-extraction";
import { useSaveCrop } from "./hooks/use-save-crop";

const App = () => {
  const [frameSize, setFrameSize] = useState<ImageSize>();
  const { pixelCrop, percentCrop, changePixelCrop, changePercentCrop, reset } = useCrop(
    frameSize ?? { width: 0, height: 0 },
  );

  const onChangeFrameSize = (size: ImageSize) => {
    setFrameSize(size);
    reset();
  };

  const { videoFile, loading, frameUrl, changeVideoFile, closeVideoFile } = useFrameExtraction(onChangeFrameSize);

  const disabled = !videoFile;
  const isDefault = !percentCrop || percentCrop.height === 0 || percentCrop.width === 0;

  const { processStatus, saveCrop, closeCompletedModal } = useSaveCrop();
  const handleSaveCrop = () => {
    if (videoFile) {
      saveCrop(videoFile, pixelCrop);
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <CompletedModal processStatus={processStatus} onClose={closeCompletedModal} />
      <ProgressModal processStatus={processStatus} />
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
          <ManualCropInput pixelCrop={pixelCrop} onChangePixelCrop={changePixelCrop} disabled={loading || disabled} />
          <Box flex={1} />
          <ResetButton onClick={reset} disabled={loading || disabled || isDefault} />
          <CropButton onClick={handleSaveCrop} disabled={loading || disabled} />
        </Group>
      </Stack>
    </MantineProvider>
  );
};

export default App;
