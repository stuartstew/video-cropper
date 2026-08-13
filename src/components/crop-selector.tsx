import { Box, Group, Stack } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import type { ImageSize } from "@tauri-apps/api/image";
import type { PixelCrop } from "react-image-crop";
import { useCrop } from "../hooks/use-crop";
import { CropButton } from "./crop-button";
import { DragCropSelector } from "./drag-crop-selector";
import { ManualCropInput } from "./manual-crop-input";
import { ResetButton } from "./reset-button";
import { VideoDropzone } from "./video-dropzone";

type Props = {
  videoFile?: FileWithPath;
  frameUrl?: string;
  frameSize: ImageSize;
  loading: boolean;
  onChangeVideoFile: (file: FileWithPath) => void;
  onSave: (pixelCrop: PixelCrop) => void;
};

export const CropSelector = ({ videoFile, frameUrl, frameSize, loading, onChangeVideoFile, onSave }: Props) => {
  const { pixelCrop, percentCrop, changePixelCrop, changePercentCrop, reset } = useCrop(frameSize);

  const disabled = !videoFile;
  const isDefault = !percentCrop || percentCrop.height === 0 || percentCrop.width === 0;

  return (
    <Stack flex={1} gap={0}>
      {!loading && videoFile ? (
        <DragCropSelector
          percentCrop={percentCrop}
          onChangePercentCrop={changePercentCrop}
          frameSize={frameSize}
          loading={loading}
          frameUrl={frameUrl}
        />
      ) : (
        <VideoDropzone onChangeVideoFile={onChangeVideoFile} loading={loading} />
      )}
      <Group px="xl" pt="md" pb="lg" gap="md" align="flex-end">
        <ManualCropInput pixelCrop={pixelCrop} onChangePixelCrop={changePixelCrop} disabled={loading || disabled} />
        <Box flex={1} />
        <ResetButton onClick={reset} disabled={loading || disabled || isDefault} />
        <CropButton onClick={() => onSave(pixelCrop)} disabled={loading || disabled} />
      </Group>
    </Stack>
  );
};
