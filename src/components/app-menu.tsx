import { Menu, Menubar } from "@mantine/core";
import { getName, getVersion } from "@tauri-apps/api/app";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { message } from "@tauri-apps/plugin-dialog";

const GITHUB_REPOSITORY_URL = "https://github.com/stuartstew/video-cropper";

type Props = {
  onOpen: () => void;
  onClose: () => void;
  onOpenLicenseModal: () => void;
};

export const AppMenu = ({ onOpen, onClose, onOpenLicenseModal }: Props) => {
  const handleExit = async () => {
    const window = getCurrentWindow();
    await window.close();
  };

  const handleShowAppInfo = async () => {
    const name = await getName();
    const version = await getVersion();
    const appInfoMessage = `
      ${name}
      ${version}
      ${GITHUB_REPOSITORY_URL}

      Copyright (c) 2026 stuartstew
      Licensed under the MIT License.
    `
      .trim()
      .replace(/^[^\S\r\n]+/gm, "");

    await message(appInfoMessage);
  };

  return (
    <Menubar>
      <Menubar.Menu width={240}>
        <Menubar.Target>File</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item onClick={onOpen}>Open</Menu.Item>
          <Menu.Item onClick={onClose}>Close</Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={handleExit}>Exit</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={240}>
        <Menubar.Target>Help</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item onClick={onOpenLicenseModal}>Licenses</Menu.Item>
          <Menu.Item onClick={handleShowAppInfo}>About VideoCropper</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
};
