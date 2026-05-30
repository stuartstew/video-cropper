import { Modal, Progress, Text } from "@mantine/core";
import type { ProcessStatus } from "@/types/process-status";

type Props = {
  processStatus: ProcessStatus;
};

export const ProgressModal = ({ processStatus }: Props) => {
  const progress = processStatus.status === "processing" ? processStatus.progress : 0;
  return (
    <Modal opened={processStatus.status === "processing"} onClose={() => {}} withCloseButton={false} centered>
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
