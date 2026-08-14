import { Button } from "@mantine/core";
import { CropIcon } from "@phosphor-icons/react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const CropButton = ({ onClick, disabled }: Props) => {
  return (
    <Button onClick={onClick} disabled={disabled} leftSection={<CropIcon weight="bold" size={14} />}>
      Crop
    </Button>
  );
};
