import { Button } from "@mantine/core";
import { CropIcon } from "@phosphor-icons/react";

type Props = {
  disabled?: boolean;
};

export const CropButton = ({ disabled }: Props) => {
  return (
    <Button disabled={disabled} leftSection={<CropIcon weight="bold" size={14} />}>
      Crop
    </Button>
  );
};
