import { Anchor, Group, Modal, Text, ThemeIcon } from "@mantine/core";
import { CheckIcon } from "@phosphor-icons/react";
import { revealItemInDir } from "@tauri-apps/plugin-opener";
import type { ProcessStatus } from "@/types/process-status";

type Props = {
  processStatus: ProcessStatus;
  onClose: () => void;
};

export const CompletedModal = ({ processStatus, onClose }: Props) => {
  const title = (
    <Group gap="sm">
      <ThemeIcon radius="xl" size="sm" color="teal">
        <CheckIcon style={{ width: "70%", height: "70%" }} />
      </ThemeIcon>
      <Text inherit>Process Completed</Text>
    </Group>
  );

  const handleClickAnchor = async () => {
    if (processStatus.status === "completed") {
      await revealItemInDir(processStatus.path);
    }
  };

  return (
    <Modal opened={processStatus.status === "completed"} onClose={onClose} title={title} centered>
      <Text>
        The cropped video has been saved{" "}
        <Anchor href="#" onClick={handleClickAnchor}>
          here.
        </Anchor>
      </Text>
    </Modal>
  );
};
