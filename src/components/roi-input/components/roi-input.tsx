import { Group } from "@mantine/core";
import { NonNegativeIntegerInput } from "./non-negative-integer-input";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  onChangeX: (value: number) => void;
  onChangeY: (value: number) => void;
  onChangeWidth: (value: number) => void;
  onChangeHeight: (value: number) => void;
};

export const ROIInput = ({ x, y, width, height, onChangeX, onChangeY, onChangeWidth, onChangeHeight }: Props) => {
  return (
    <Group gap="xs">
      <NonNegativeIntegerInput value={x} onChange={onChangeX} label="X" w={96} />
      <NonNegativeIntegerInput value={y} onChange={onChangeY} label="Y" w={96} />
      <NonNegativeIntegerInput value={width} onChange={onChangeWidth} label="Width" w={96} />
      <NonNegativeIntegerInput value={height} onChange={onChangeHeight} label="Height" w={96} />
    </Group>
  );
};
