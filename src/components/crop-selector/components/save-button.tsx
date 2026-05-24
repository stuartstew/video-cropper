import { Button } from "@mantine/core";

type Props = {
  disabled?: boolean;
};

export const SaveButton = ({ disabled }: Props) => {
  return <Button disabled={disabled}>Save</Button>;
};
