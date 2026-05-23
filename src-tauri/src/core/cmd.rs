#![warn(clippy::pedantic)]

use ffmpeg_sidecar::command::FfmpegCommand;
use image::{GenericImageView, ImageReader};
use std::fs;
use tauri::{AppHandle, Manager, command};

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
pub struct FrameSize {
    path: String,
    width: u32,
    height: u32,
}

#[command]
pub async fn fetch_first_frame(app: AppHandle, path: String) -> Result<FrameSize, Error> {
    let output = app.path().temp_dir()?.join("frame.png");
    let output_str = output.to_str().unwrap().to_string();

    let _ = fs::remove_file(&output);

    FfmpegCommand::new()
        .input(path)
        .frames(1)
        .output(&output_str)
        .spawn()?
        .wait()?;

    let img = ImageReader::open(&output)?.decode()?;
    let (width, height) = img.dimensions();
    Ok(FrameSize {
        path: output_str,
        width,
        height,
    })
}
