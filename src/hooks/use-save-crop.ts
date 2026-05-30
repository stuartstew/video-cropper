import type { FileWithPath } from "@mantine/dropzone";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { extname } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import type { Crop } from "react-image-crop";

export const useSaveCrop = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [outputPath, setOutputPath] = useState("");

  const saveCrop = async (videoFile: FileWithPath, crop: Crop) => {
    const extension = await extname(videoFile.name);
    const path = await save({
      defaultPath: videoFile.path,
      filters: [
        { name: `${extension.toUpperCase()} Files`, extensions: [extension] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (!path) return;

    const arrayBuffer = await videoFile.arrayBuffer();
    const inputBytes = Array.from(new Uint8Array(arrayBuffer));

    const frameCount = (await invoke<number | null>("fetch_frame_count", { inputBytes })) ?? 1;

    const unlisten = await listen<number>("frame", (event) => setProgress((event.payload / frameCount) * 100));

    setProgress(0);
    setProcessing(true);
    setOutputPath(path);

    invoke("save_cropped_video", { inputBytes, crop, outputPath: path })
      .then(() => setCompleted(true))
      .catch((e) => console.error(e))
      .finally(() => {
        unlisten();
        setProcessing(false);
      });
  };

  const closeCompletedModal = () => setCompleted(false);

  return { processing, progress, completed, outputPath, saveCrop, closeCompletedModal };
};
