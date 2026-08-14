import { Group, Stack } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import type { ImageSize } from "@tauri-apps/api/image";
import type { PixelCrop } from "react-image-crop";
import { CropButton } from "./components/crop-button";
import { DragCropSelector } from "./components//drag-crop-selector";
import { ManualCropInput } from "./components//manual-crop-input";
import { ResetButton } from "./components//reset-button";
import { VideoDropzone } from "./components/video-dropzone";
import { useCrop } from "./hooks/use-crop";

type Props = {
  openRef: React.RefObject<(() => void) | null>;
  videoFile?: FileWithPath;
  frameUrl?: string;
  frameSize: ImageSize;
  loading: boolean;
  onChangeVideoFile: (file: FileWithPath) => void;
  onSave: (pixelCrop: PixelCrop) => void;
};

export const CropSelector = ({
  openRef,
  videoFile,
  frameUrl,
  frameSize,
  loading,
  onChangeVideoFile,
  onSave,
}: Props) => {
  const { pixelCrop, percentCrop, changePixelCrop, changePercentCrop, reset } = useCrop(frameSize);

  const disabled = !videoFile;
  const isDefault = !percentCrop || percentCrop.height === 0 || percentCrop.width === 0;

  return (
    <Stack flex={1} gap={0}>
      {videoFile ? (
        <DragCropSelector
          percentCrop={percentCrop}
          onChangePercentCrop={changePercentCrop}
          frameSize={frameSize}
          loading={loading}
          frameUrl={frameUrl}
        />
      ) : (
        <VideoDropzone openRef={openRef} onChangeVideoFile={onChangeVideoFile} loading={loading} />
      )}
      <Group px="xl" pt="md" pb="lg" justify="space-between" align="flex-end">
        <ManualCropInput pixelCrop={pixelCrop} onChangePixelCrop={changePixelCrop} disabled={loading || disabled} />
        <Group gap="md">
          <ResetButton onClick={reset} disabled={loading || disabled || isDefault} />
          <CropButton onClick={() => onSave(pixelCrop)} disabled={loading || disabled} />
        </Group>
      </Group>
    </Stack>
  );
};
