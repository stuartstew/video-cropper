import { Group } from "@mantine/core";
import type { PixelCrop } from "react-image-crop";
import { NonNegativeIntegerInput } from "./components/non-negative-integer-input";

type Props = {
  pixelCrop: PixelCrop;
  onChangePixelCrop: (value: PixelCrop) => void;
  disabled?: boolean;
};

export const ManualCropInput = ({ pixelCrop, onChangePixelCrop, disabled }: Props) => {
  return (
    <Group gap="xs">
      <NonNegativeIntegerInput
        value={pixelCrop.x}
        onChange={(x) => onChangePixelCrop({ ...pixelCrop, x })}
        label="X"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={pixelCrop.y}
        onChange={(y) => onChangePixelCrop({ ...pixelCrop, y })}
        label="Y"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={pixelCrop.width}
        onChange={(width) => onChangePixelCrop({ ...pixelCrop, width })}
        label="Width"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={pixelCrop.height}
        onChange={(height) => onChangePixelCrop({ ...pixelCrop, height })}
        label="Height"
        disabled={disabled}
        w={96}
      />
    </Group>
  );
};
