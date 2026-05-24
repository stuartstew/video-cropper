import { Box, Group, Stack } from "@mantine/core";
import type { Crop, PercentCrop } from "react-image-crop";
import type { ImageSize } from "@/types/image-size";
import { DragCropSelector } from "./components/drag-crop-selector";
import { ManualCropInput } from "./components/manual-crop-input";
import { ResetButton } from "./components/reset-button";
import { SaveButton } from "./components/save-button";

type Props = {
  loading: boolean;
  disabled: boolean;
  frameSize?: ImageSize;
  frameUrl?: string;
  crop: Crop;
  percentCrop?: PercentCrop;
  onChangeCrop: (value: Crop) => void;
  onChangePercentCrop: (value: PercentCrop) => void;
  onReset: () => void;
};

export const CropSelector = ({
  loading,
  disabled,
  frameSize,
  frameUrl,
  crop,
  percentCrop,
  onChangeCrop,
  onChangePercentCrop,
  onReset,
}: Props) => {
  return (
    <Stack h="100vh" display="flex" gap={0}>
      <DragCropSelector
        percentCrop={percentCrop}
        onChangePercentCrop={onChangePercentCrop}
        frameSize={frameSize}
        loading={loading}
        frameUrl={frameUrl}
      />
      <Group px="xl" pt="md" pb="lg" gap="md" align="flex-end">
        <ManualCropInput crop={crop} onChangeCrop={onChangeCrop} disabled={loading || disabled} />
        <Box flex={1} />
        <ResetButton onClick={onReset} disabled={loading || disabled} />
        <SaveButton disabled={loading || disabled} />
      </Group>
    </Stack>
  );
};
