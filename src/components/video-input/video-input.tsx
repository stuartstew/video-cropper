import { FileInput } from "./components/file-input";

type Props = {
  value?: string;
  onChange: (value?: string) => void;
  onChangeOverlay: (value: boolean) => void;
};

const basename = (path: string) => path.replace(/^.*[\\/]/, "");

export const VideoInput = ({ value, onChange, onChangeOverlay }: Props) => {
  const filters = [
    {
      name: "Video Files",
      extensions: ["mp4", "mkv", "avi", "mov", "webm"],
    },
  ];

  return (
    <FileInput
      value={value && basename(value)}
      onChange={onChange}
      label="Video"
      placeholder="Select a video file..."
      filters={filters}
      onChangeOverlay={onChangeOverlay}
    />
  );
};
