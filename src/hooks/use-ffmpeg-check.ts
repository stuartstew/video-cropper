import { invoke } from "@tauri-apps/api/core";
import { useEffect, useRef } from "react";

export const useFfmpegCheck = () => {
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) {
      return;
    }
    hasChecked.current = true;

    const warnIfFfmpegIsNotInstalled = async () => await invoke("warn_if_ffmpeg_is_not_installed");
    warnIfFfmpegIsNotInstalled();
  }, []);
};
