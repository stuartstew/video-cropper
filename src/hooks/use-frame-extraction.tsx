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
  const [videoPath, setVideoPath] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string>();

  const changeVideoPath = (value?: string) => {
    if (!value) return;

    setVideoPath(value);
    setLoading(true);

    invoke<FrameData>("extract_first_frame", { path: value })
      .then((frameData) => {
        onChangeFrameSize(frameData.size);
        setFrameUrl(filePathToUrlWithHash(frameData.path));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return { videoPath, loading, frameUrl, changeVideoPath };
};
