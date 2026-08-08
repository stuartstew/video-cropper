import type { FileWithPath } from "@mantine/dropzone";
import { useFileDialog } from "@mantine/hooks";

export const useVideoFileDialog = (onChangeVideoFile: (file: FileWithPath) => void) => {
  return useFileDialog({
    multiple: false,
    accept: "video/*",
    resetOnOpen: true,
    onChange: (files) => {
      if (files) {
        onChangeVideoFile(files[0]);
      }
    },
  });
};
