import type { FileWithPath } from "@mantine/dropzone";
import { extname } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";
import type { Crop } from "react-image-crop";

export const useSaveCrop = () => {
  const saveCrop = async (videoFile: FileWithPath, crop: Crop) => {
    const extension = await extname(videoFile.name);
    await save({
      defaultPath: videoFile.path,
      filters: [
        { name: `${extension.toUpperCase()} Files`, extensions: [extension] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
  };

  return { saveCrop };
};
