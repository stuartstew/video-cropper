import { ActionIcon, Group, Text } from "@mantine/core";
import { XIcon } from "@phosphor-icons/react";

type Props = {
  videoName: string;
  onClose: () => void;
};

export const VideoTitleBar = ({ videoName, onClose }: Props) => {
  return (
    <Group px="xl" py="sm" justify="space-between">
      <Text truncate flex={1}>
        {videoName}
      </Text>
      <ActionIcon aria-label="Close" onClick={onClose} variant="default">
        <XIcon style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </Group>
  );
};
