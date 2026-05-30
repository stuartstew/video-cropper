import { Loader, Modal, Stack, Text } from "@mantine/core";

type Props = {
  opened: boolean;
};

export const ProgressModal = ({ opened }: Props) => {
  return (
    <Modal opened={opened} onClose={() => {}} withCloseButton={false} centered>
      <Stack align="center" gap="md">
        <Text>Cropping...</Text>
        <Loader color="blue" />
      </Stack>
    </Modal>
  );
};
