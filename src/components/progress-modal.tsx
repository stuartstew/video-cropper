import { Modal, Progress, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  progress: number;
};

export const ProgressModal = ({ opened, progress }: Props) => {
  return (
    <Modal opened={opened} onClose={() => {}} withCloseButton={false} centered>
      <Text mb="md" ta="center">
        Cropping...
      </Text>
      <Text mb="xs" ta="center" size="sm" c="dimmed">
        {Math.round(progress)}%
      </Text>
      <Progress value={progress} />
    </Modal>
  );
};
