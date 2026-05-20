import { FileInput } from "@mantine/core";

export const VideoInput = () => {
  return <FileInput accept="video/*" label="Video" placeholder="Select a video file..." px="xl" py="md" />;
};
