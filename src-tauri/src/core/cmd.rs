#![warn(clippy::pedantic)]

use std::io::{Read, Write};

use anyhow::anyhow;
use ffmpeg_sidecar::command::FfmpegCommand;
use regex::Regex;
use tauri::{AppHandle, Emitter, command};
use tempfile::{NamedTempFile, TempPath};

use crate::core::cmd::Error::Anyhow;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Anyhow(#[from] anyhow::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

/// Write to a new temporary file and return its path.
fn create_tempfile(data: &[u8]) -> std::io::Result<TempPath> {
    let mut file = NamedTempFile::new()?;
    file.write_all(data)?;
    Ok(file.into_temp_path())
}

#[command]
pub async fn extract_first_frame(input_bytes: Vec<u8>) -> Result<Vec<u8>, Error> {
    let input_path = create_tempfile(&input_bytes)?;

    let mut child = FfmpegCommand::new()
        .input(input_path.to_str().unwrap())
        .frames(1)
        .format("image2pipe")
        .codec_video("png")
        .output("pipe:1")
        .spawn()?;

    let mut stdout = child.take_stdout().ok_or(Anyhow(anyhow!("stdout unavailable")))?;

    let mut output_bytes = vec![];
    stdout.read_to_end(&mut output_bytes)?;

    Ok(output_bytes)
}

#[command]
pub async fn fetch_frame_count(input_bytes: Vec<u8>) -> Result<u32, Error> {
    let input_path = create_tempfile(&input_bytes)?;

    let mut child = FfmpegCommand::new()
        .input(input_path.to_str().unwrap())
        .map("0:v:0")
        .codec_video("copy")
        .format("null")
        .output("pipe:1")
        .spawn()?;

    let mut stderr = child.take_stderr().ok_or(Anyhow(anyhow!("stderr unavailable")))?;

    let mut buffer = String::new();
    stderr.read_to_string(&mut buffer)?;

    extract_frame_count_from_ffmpeg_stderr(&buffer)
        .ok_or(Anyhow(anyhow!("cannot extract frame count from ffmpeg stderr")))
}

fn extract_frame_count_from_ffmpeg_stderr(buffer: &str) -> Option<u32> {
    let re = Regex::new(r"frame=\s*(\d+)").unwrap();
    buffer.lines().find_map(|line| re.captures(line).and_then(|caps| caps.get(1).unwrap().as_str().parse().ok()))
}

#[derive(Debug, Clone, Copy, serde::Deserialize)]
pub struct Crop {
    x: u32,
    y: u32,
    width: u32,
    height: u32,
}

#[command]
pub async fn save_cropped_video(
    app: AppHandle,
    input_bytes: Vec<u8>,
    crop: Crop,
    output_path: String,
) -> Result<(), Error> {
    let input_path = create_tempfile(&input_bytes)?;

    let iter = FfmpegCommand::new()
        .input(input_path.to_str().unwrap())
        .arg("-vf")
        .arg(format!("crop={}:{}:{}:{}", crop.width, crop.height, crop.x, crop.y))
        .overwrite()
        .output(&output_path)
        .spawn()?
        .iter()?;

    for progress in iter.filter_progress() {
        app.emit("frame", progress.frame)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_frame_count_from_ffmpeg_stderr() {
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("frame=1 fps=0.0"), Some(1));
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("frame= 1 fps=0.0"), Some(1));
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("frame=23 fps=0.0"), Some(23));
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("frame= 23 fps=0.0"), Some(23));
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("ffmpeg"), None);
        assert_eq!(extract_frame_count_from_ffmpeg_stderr("fps=0.0"), None);
    }
}
