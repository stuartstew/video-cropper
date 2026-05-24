import { Group } from "@mantine/core";
import type { Crop } from "react-image-crop";
import { NonNegativeIntegerInput } from "./components/non-negative-integer-input";

type Props = {
  crop: Crop;
  onChangeCrop: (value: Crop) => void;
  disabled?: boolean;
};

export const ManualCropInput = ({ crop, onChangeCrop, disabled }: Props) => {
  return (
    <Group gap="xs">
      <NonNegativeIntegerInput
        value={crop.x}
        onChange={(x) => onChangeCrop({ ...crop, x })}
        label="X"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={crop.y}
        onChange={(y) => onChangeCrop({ ...crop, y })}
        label="Y"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={crop.width}
        onChange={(width) => onChangeCrop({ ...crop, width })}
        label="Width"
        disabled={disabled}
        w={96}
      />
      <NonNegativeIntegerInput
        value={crop.height}
        onChange={(height) => onChangeCrop({ ...crop, height })}
        label="Height"
        disabled={disabled}
        w={96}
      />
    </Group>
  );
};
