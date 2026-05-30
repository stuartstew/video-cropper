import { Anchor, Group, Modal, Text, ThemeIcon } from "@mantine/core";
import { CheckIcon } from "@phosphor-icons/react";
import { revealItemInDir } from "@tauri-apps/plugin-opener";

type Props = {
  opened: boolean;
  onClose: () => void;
  outputPath: string;
};

export const CompletedModal = ({ opened, onClose, outputPath }: Props) => {
  const title = (
    <Group gap="sm">
      <ThemeIcon radius="xl" size="sm" color="teal">
        <CheckIcon style={{ width: "70%", height: "70%" }} />
      </ThemeIcon>
      <Text inherit>Process Completed</Text>
    </Group>
  );

  const handleClickAnchor = async () => await revealItemInDir(outputPath);

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered style={{ minWidth: 0, overflow: "hidden" }}>
      <Text>
        The cropped video has been saved{" "}
        <Anchor href="#" onClick={handleClickAnchor}>
          here.
        </Anchor>
      </Text>
    </Modal>
  );
};
