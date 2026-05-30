import type { FileWithPath } from "@mantine/dropzone";
import { invoke } from "@tauri-apps/api/core";
import { extname } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import type { Crop } from "react-image-crop";

export const useSaveCrop = () => {
  const [processing, setProcessing] = useState(false);

  const saveCrop = async (videoFile: FileWithPath, crop: Crop) => {
    const extension = await extname(videoFile.name);
    const outputPath = await save({
      defaultPath: videoFile.path,
      filters: [
        { name: `${extension.toUpperCase()} Files`, extensions: [extension] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (!outputPath) return;

    const arrayBuffer = await videoFile.arrayBuffer();
    const inputBytes = Array.from(new Uint8Array(arrayBuffer));

    setProcessing(true);

    invoke("save_cropped_video", { inputBytes, crop, outputPath })
      .catch((e) => console.error(e))
      .finally(() => setProcessing(false));
  };

  return { processing, saveCrop };
};
