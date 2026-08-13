import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { MantineProvider, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ImageSize } from "@tauri-apps/api/image";
import { useState } from "react";
import type { PixelCrop } from "react-image-crop";
import { AppMenu } from "./components/app-menu";
import { CompletedModal } from "./components/completed-modal";
import { CropSelector } from "./components/crop-selector";
import { LicenseModal } from "./components/license-modal";
import { ProgressModal } from "./components/progress-modal";
import { useFrameExtraction } from "./hooks/use-frame-extraction";
import { useSaveCrop } from "./hooks/use-save-crop";
import { useVideoFileDialog } from "./hooks/use-video-file-dialog";

const App = () => {
  const [frameSize, setFrameSize] = useState<ImageSize>();

  const { videoFile, loading, frameUrl, key, changeVideoFile, closeVideoFile } = useFrameExtraction(setFrameSize);

  const { processStatus, saveCrop, closeCompletedModal } = useSaveCrop();
  const handleSaveCrop = (pixelCrop: PixelCrop) => {
    if (videoFile) {
      saveCrop(videoFile, pixelCrop);
    }
  };

  const fileDialog = useVideoFileDialog(changeVideoFile);
  const [isLicenseModalOpened, { open: openLicenseModal, close: closeLicenseModal }] = useDisclosure(false);

  return (
    <MantineProvider defaultColorScheme="dark">
      <LicenseModal opened={isLicenseModalOpened} onClose={closeLicenseModal} />
      <CompletedModal processStatus={processStatus} onClose={closeCompletedModal} />
      <ProgressModal processStatus={processStatus} />
      <Stack h="100vh" gap={0}>
        <AppMenu
          loading={loading}
          isFileOpened={videoFile != null}
          onOpen={fileDialog.open}
          onClose={closeVideoFile}
          onOpenLicenseModal={openLicenseModal}
        />
        <CropSelector
          key={key}
          videoFile={videoFile}
          frameUrl={frameUrl}
          frameSize={frameSize ?? { height: 0, width: 0 }}
          loading={loading}
          onChangeVideoFile={changeVideoFile}
          onSave={handleSaveCrop}
        />
      </Stack>
    </MantineProvider>
  );
};

export default App;
