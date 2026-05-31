import type { FileWithPath } from "@mantine/dropzone";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { extname } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import type { PixelCrop } from "react-image-crop";
import type { ProcessStatus } from "@/types/process-status";

export const useSaveCrop = () => {
  const [processStatus, setProcessStatus] = useState<ProcessStatus>({ status: "idle" });

  const saveCrop = async (videoFile: FileWithPath, pixelCrop: PixelCrop) => {
    const extension = await extname(videoFile.name);
    const path = await save({
      defaultPath: videoFile.path,
      filters: [
        { name: `${extension.toUpperCase()} Files`, extensions: [extension] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (!path) return;

    setProcessStatus({ status: "processing", progress: 0 });

    const arrayBuffer = await videoFile.arrayBuffer();
    const inputBytes = Array.from(new Uint8Array(arrayBuffer));

    const frameCount = await invoke<number>("fetch_frame_count", { inputBytes }).catch((e) => {
      console.error(e);
      return 1;
    });

    const unlisten = await listen<number>("frame", (event) =>
      setProcessStatus({ status: "processing", progress: (event.payload / frameCount) * 100 }),
    );

    invoke("save_cropped_video", { inputBytes, pixelCrop, outputPath: path })
      .then(() => setProcessStatus({ status: "completed", path }))
      .catch((e) => {
        console.error(e);
        setProcessStatus({ status: "idle" });
      })
      .finally(unlisten);
  };

  const closeCompletedModal = () => setProcessStatus({ status: "idle" });

  return { processStatus, saveCrop, closeCompletedModal };
};
