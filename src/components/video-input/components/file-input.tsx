import { CloseButton, InputBase } from "@mantine/core";
import { type DialogFilter, open } from "@tauri-apps/plugin-dialog";
import type React from "react";

type Props = {
  value?: string;
  label?: React.ReactNode;
  placeholder?: string;
  directory?: boolean;
  defaultPath?: string;
  filters?: DialogFilter[];
  clearable?: boolean;
  onChange: (value?: string) => void;
  onChangeOverlay: (value: boolean) => void;
};

export const FileInput = ({
  value,
  label,
  placeholder,
  filters,
  defaultPath,
  directory,
  clearable,
  onChange,
  onChangeOverlay,
}: Props) => {
  const handleClick = async () => {
    onChangeOverlay(true);
    await open({ directory: directory, defaultPath: defaultPath, filters })
      .then((x) => {
        if (x != null) {
          onChange(x);
        }
      })
      .finally(() => onChangeOverlay(false));
  };

  const handleClear = () => onChange(undefined);

  return (
    <InputBase
      value={value ?? ""}
      label={label}
      placeholder={placeholder}
      readOnly
      pointer
      onClick={handleClick}
      rightSection={clearable && value != null && <CloseButton onClick={handleClear} />}
    />
  );
};
