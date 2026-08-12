use std::fs::File;
use std::io::BufReader;

use anyhow::Context as _;
use serde_json::Value;
use tauri::{AppHandle, Manager, command};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Anyhow(#[from] anyhow::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    SerdeJson(#[from] serde_json::Error),
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

#[derive(Debug, Clone, PartialEq, Eq, serde::Deserialize, serde::Serialize)]
pub struct FrontendLicense {
    name: String,
    versions: Vec<String>,
    license: String,
}

#[command]
#[allow(clippy::needless_pass_by_value)]
pub fn read_frontend_licenses(app: AppHandle) -> Result<Vec<FrontendLicense>, Error> {
    let licenses_path = app.path().resource_dir()?.join("licenses/frontend-licenses.json");
    let file = File::open(licenses_path)?;
    let reader = BufReader::new(file);

    let value: Value = serde_json::from_reader(reader)?;
    parse_frontend_licenses_json(&value)
}

fn parse_frontend_licenses_json(value: &serde_json::Value) -> Result<Vec<FrontendLicense>, Error> {
    let mut licenses = value
        .as_object()
        .context("cannot parse frontend-licenses.json")?
        .values()
        .map(|value| value.as_array().context("cannot parse frontend-licenses.json"))
        .collect::<Result<Vec<_>, _>>()?
        .iter()
        .flat_map(|arr| arr.iter().cloned().map(serde_json::from_value::<FrontendLicense>).collect::<Vec<_>>())
        .collect::<Result<Vec<_>, _>>()?;

    licenses.sort_unstable_by_key(|license| license.name.clone());

    Ok(licenses)
}

#[command]
#[allow(clippy::needless_pass_by_value)]
pub fn read_rust_licenses_html(app: AppHandle) -> Result<String, Error> {
    let licenses_path = app.path().resource_dir()?.join("licenses/rust-licenses.html");
    Ok(std::fs::read_to_string(licenses_path)?)
}

#[cfg(test)]
mod tests {
    use super::*;

    use serde_json::json;

    #[test]
    fn test_parse_frontend_licenses_json() {
        let value = json!({
            "MIT": [
                {
                    "name": "foo",
                    "versions": ["1.0.0"],
                    "license": "MIT"
                },
                {
                    "name": "bar",
                    "versions": ["1.1.0"],
                    "license": "MIT"
                }
            ],
            "Apache-2.0": [
                {
                    "name": "baz",
                    "versions": ["2.0.0"],
                    "license": "Apache-2.0"
                }
            ]
        });

        let licenses = parse_frontend_licenses_json(&value);
        assert!(licenses.is_ok());

        let licenses = licenses.unwrap();
        assert_eq!(
            licenses,
            [
                FrontendLicense { name: "bar".into(), versions: vec!["1.1.0".into()], license: "MIT".into() },
                FrontendLicense { name: "baz".into(), versions: vec!["2.0.0".into()], license: "Apache-2.0".into() },
                FrontendLicense { name: "foo".into(), versions: vec!["1.0.0".into()], license: "MIT".into() },
            ]
        );
    }
}
