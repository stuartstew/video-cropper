#![warn(clippy::pedantic)]

use std::{fs, io::Write};

use ffmpeg_sidecar::command::FfmpegCommand;
use image::{GenericImageView, ImageReader};
use tauri::{AppHandle, Manager, command};
use tempfile::NamedTempFile;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Anyhow(#[from] anyhow::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
    #[error(transparent)]
    Image(#[from] image::ImageError),
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[derive(Debug, Clone, serde::Serialize)]
pub struct FrameData {
    path: String,
    size: ImageSize,
}

#[derive(Debug, Clone, Copy, serde::Serialize)]
pub struct ImageSize {
    width: u32,
    height: u32,
}

#[command]
pub async fn extract_first_frame(app: AppHandle, input_bytes: Vec<u8>) -> Result<FrameData, Error> {
    let output = app.path().temp_dir()?.join("frame.png");
    let output_str = output.to_str().unwrap().to_string();

    let _ = fs::remove_file(&output);

    let mut tmp = NamedTempFile::new()?;
    tmp.write_all(&input_bytes)?;
    let tmp_path = tmp.path().to_owned();

    FfmpegCommand::new()
        .input(tmp_path.to_str().unwrap())
        .frames(1)
        .output(&output_str)
        .spawn()?
        .wait()?;

    let img = ImageReader::open(&output)?.decode()?;
    let (width, height) = img.dimensions();
    let size = ImageSize { width, height };
    Ok(FrameData {
        path: output_str,
        size,
    })
}
