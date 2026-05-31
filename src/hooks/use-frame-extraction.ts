import type { FileWithPath } from "@mantine/dropzone";
import { invoke } from "@tauri-apps/api/core";
import type { ImageSize } from "@tauri-apps/api/image";
import { Image } from "@tauri-apps/api/image";
import { useState } from "react";

export const useFrameExtraction = (onChangeFrameSize: (size: ImageSize) => void) => {
  const [videoFile, setVideoFile] = useState<FileWithPath>();
  const [loading, setLoading] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string>();

  const changeVideoFile = async (file?: FileWithPath) => {
    if (!file) return;

    setVideoFile(file);
    setLoading(true);

    const arrayBuffer = await file.arrayBuffer();
    const bytes = Array.from(new Uint8Array(arrayBuffer));

    invoke<number[]>("extract_first_frame", { inputBytes: bytes })
      .then(async (outputBytes) => {
        const outputByteArray = new Uint8Array(outputBytes);
        const blob = new Blob([outputByteArray], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setFrameUrl(url);

        const image = await Image.fromBytes(outputByteArray);
        const imageSize = await image.size();
        onChangeFrameSize(imageSize);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const closeVideoFile = () => setVideoFile(undefined);

  return { videoFile, loading, frameUrl, changeVideoFile, closeVideoFile };
};
