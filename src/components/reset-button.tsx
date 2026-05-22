import { Button } from "@mantine/core";

type Props = {
  onClick: () => void;
};

export const ResetButton = ({ onClick }: Props) => {
  return (
    <Button variant="default" onClick={onClick}>
      Reset
    </Button>
  );
};
