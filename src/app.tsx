import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { MantineProvider } from "@mantine/core";
import type { ImageSize } from "@tauri-apps/api/image";
import { useState } from "react";
import type { PixelCrop } from "react-image-crop";
import { CompletedModal } from "./components/completed-modal";
import { CropSelector } from "./components/crop-selector";
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

  useMenu({ onOpen: fileDialog.open, onClose: closeVideoFile });

  return (
    <MantineProvider defaultColorScheme="dark">
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
        onClose={closeVideoFile}
      />
    </MantineProvider>
  );
};

export default App;
