import { FileInput } from "@mantine/core";

type Props = {
  value?: File;
  onChange: (value?: File) => void;
};

export const VideoInput = ({ value, onChange }: Props) => {
  return (
    <FileInput
      value={value ?? null}
      onChange={(payload) => onChange(payload ?? undefined)}
      accept="video/*"
      label="Video"
      placeholder="Select a video file..."
    />
  );
};
