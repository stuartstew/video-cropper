import { CheckMenuItem, Menu, MenuItem, PredefinedMenuItem, Submenu } from "@tauri-apps/api/menu";
import { useEffect } from "react";

export const useMenu = () => {
  useEffect(() => {
    const setupMenu = async () => {
      const fileSubmenu = await Submenu.new({
        text: "File",
        items: [
          await MenuItem.new({
            id: "open",
            text: "Open",
            action: () => {},
          }),
          await MenuItem.new({
            id: "close",
            text: "Close",
            action: () => {},
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

      const colorSchemeSubmenu = await Submenu.new({
        text: "Color scheme",
        items: [
          await CheckMenuItem.new({
            id: "light",
            text: "Light",
            checked: false,
            action: () => {},
          }),
          await CheckMenuItem.new({
            id: "dark",
            text: "Dark",
            checked: false,
            action: () => {},
          }),
          await CheckMenuItem.new({
            id: "system",
            text: "System",
            checked: true,
            action: () => {},
          }),
        ],
      });

      const settingsSubmenu = await Submenu.new({
        text: "Settings",
        items: [colorSchemeSubmenu],
      });

      const helpSubmenu = await Submenu.new({
        text: "Help",
        items: [
          await MenuItem.new({
            id: "about",
            text: "About Video Cropper",
            action: () => {},
          }),
        ],
      });

      const menu = await Menu.new({
        items: [fileSubmenu, settingsSubmenu, helpSubmenu],
      });

      await menu.setAsAppMenu();
    };

    setupMenu();
  }, []);
};
