#![warn(clippy::pedantic)]

use std::io::{Read, Write};

use anyhow::anyhow;
use ffmpeg_sidecar::command::FfmpegCommand;
use tauri::command;
use tempfile::NamedTempFile;

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

#[command]
pub async fn extract_first_frame(input_bytes: Vec<u8>) -> Result<Vec<u8>, Error> {
    let mut tmp = NamedTempFile::new()?;
    tmp.write_all(&input_bytes)?;
    let tmp_path = tmp.path().to_owned();

    let mut child = FfmpegCommand::new()
        .input(tmp_path.to_str().unwrap())
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
