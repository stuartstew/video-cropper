import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import type { FrameData } from "@/types/frame";
import type { ImageSize } from "@/types/image-size";

const filePathToUrlWithHash = (filePath: string) => {
  const baseUrl = convertFileSrc(filePath);
  const hash = Date.now();
  return `${baseUrl}?t=${hash}`;
};

export const useFrameExtraction = (onChangeFrameSize: (size: ImageSize) => void) => {
  const [videoFile, setVideoFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string>();

  const changeVideoFile = async (file?: File) => {
    if (!file) return;

    setVideoFile(file);
    setLoading(true);

    const arrayBuffer = await file.arrayBuffer();
    const bytes = Array.from(new Uint8Array(arrayBuffer));

    invoke<FrameData>("extract_first_frame", { inputBytes: bytes })
      .then((frameData) => {
        onChangeFrameSize(frameData.size);
        setFrameUrl(filePathToUrlWithHash(frameData.path));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return { videoFile, loading, frameUrl, changeVideoFile };
};
