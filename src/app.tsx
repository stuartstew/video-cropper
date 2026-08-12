import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ImageSize } from "@tauri-apps/api/image";
import { useState } from "react";
import type { PixelCrop } from "react-image-crop";
import { CompletedModal } from "./components/completed-modal";
import { CropSelector } from "./components/crop-selector";
import { LicenseModal } from "./components/license-modal";
import { ProgressModal } from "./components/progress-modal";
import { useFrameExtraction } from "./hooks/use-frame-extraction";
import { useMenu } from "./hooks/use-menu";
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

  useMenu({ onOpen: fileDialog.open, onClose: closeVideoFile, onOpenLicenseModal: openLicenseModal });

  return (
    <MantineProvider defaultColorScheme="dark">
      <LicenseModal opened={isLicenseModalOpened} onClose={closeLicenseModal} />
      <CompletedModal processStatus={processStatus} onClose={closeCompletedModal} />
      <ProgressModal processStatus={processStatus} />
      <CropSelector
        key={key}
        videoFile={videoFile}
        frameUrl={frameUrl}
        frameSize={frameSize ?? { height: 0, width: 0 }}
        loading={loading}
        onChangeVideoFile={changeVideoFile}
        onSave={handleSaveCrop}
      />
    </MantineProvider>
  );
};

export default App;
