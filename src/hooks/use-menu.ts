import { Menu, MenuItem, PredefinedMenuItem, Submenu } from "@tauri-apps/api/menu";
import { message } from "@tauri-apps/plugin-dialog";
import { useEffect, useRef } from "react";

const appInfoMessage = `
Video Cropper
https://github.com/stuartstew/video-cropper
`.trim();

type Props = {
  onOpen: () => void;
  onClose: () => void;
};

export const useMenu = ({ onOpen, onClose }: Props) => {
  // Prevents menu from being re-rendered when event handlers change
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const showAppInfoDialog = async () => {
      await message(appInfoMessage);
    };

    const setupMenu = async () => {
      const fileSubmenu = await Submenu.new({
        text: "File",
        items: [
          await MenuItem.new({
            id: "open",
            text: "Open",
            action: onOpenRef.current,
          }),
          await MenuItem.new({
            id: "close",
            text: "Close",
            action: onCloseRef.current,
          }),
          await PredefinedMenuItem.new({
            item: "Separator",
          }),
          await PredefinedMenuItem.new({
            item: "CloseWindow",
            text: "Exit",
          }),
        ],
      });

      const helpSubmenu = await Submenu.new({
        text: "Help",
        items: [
          await MenuItem.new({
            id: "about",
            text: "About Video Cropper",
            action: showAppInfoDialog,
          }),
        ],
      });

      const menu = await Menu.new({
        items: [fileSubmenu, helpSubmenu],
      });

      await menu.setAsAppMenu();
    };

    setupMenu();
  }, []);
};
