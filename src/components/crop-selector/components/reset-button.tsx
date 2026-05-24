import { Button } from "@mantine/core";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const ResetButton = ({ onClick, disabled }: Props) => {
  return (
    <Button variant="default" onClick={onClick} disabled={disabled}>
      Reset
    </Button>
  );
};
