import { Box, Group, Text } from "@mantine/core";
import { Dropzone, type FileWithPath } from "@mantine/dropzone";
import { UploadSimpleIcon, VideoIcon, XIcon } from "@phosphor-icons/react";

type Props = {
  onChangeVideoFile: (value: FileWithPath) => void;
  loading: boolean;
};

export const VideoDropzone = ({ onChangeVideoFile, loading }: Props) => {
  return (
    <Box display="flex" flex={1} bg="#000" px="md" py="md">
      <Dropzone
        accept={["video/*"]}
        multiple={false}
        onDrop={(files) => onChangeVideoFile(files[0])}
        loading={loading}
        w="100%"
        h="100%"
        bg="#00000000"
        display="flex"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Group justify="center" gap="lg" mih={220} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <UploadSimpleIcon size={64} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XIcon size={64} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <VideoIcon size={64} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="32" inline>
              Drop video
            </Text>
            <Text size="16" c="dimmed" inline mt={7}>
              or click here to open video
            </Text>
          </div>
        </Group>
      </Dropzone>
    </Box>
  );
};
