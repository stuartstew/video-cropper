import { Group } from "@mantine/core";
import type { Crop } from "react-image-crop";
import { NonNegativeIntegerInput } from "./components/non-negative-integer-input";

type Props = {
  crop: Crop;
  onChangeCrop: (value: Crop) => void;
};

export const ROIInput = ({ crop, onChangeCrop }: Props) => {
  return (
    <Group gap="xs">
      <NonNegativeIntegerInput value={crop.x} onChange={(x) => onChangeCrop({ ...crop, x })} label="X" w={96} />
      <NonNegativeIntegerInput value={crop.y} onChange={(y) => onChangeCrop({ ...crop, y })} label="Y" w={96} />
      <NonNegativeIntegerInput
        value={crop.width}
        onChange={(width) => onChangeCrop({ ...crop, width })}
        label="Width"
        w={96}
      />
      <NonNegativeIntegerInput
        value={crop.height}
        onChange={(height) => onChangeCrop({ ...crop, height })}
        label="Height"
        w={96}
      />
    </Group>
  );
};
