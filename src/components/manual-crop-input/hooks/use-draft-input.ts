import { useState } from "react";

export const useDraftInput = <T>(value: T, onBlur: (draft: T) => void) => {
  const [draft, setDraft] = useState<T>(value);
  const [oldValue, setOldValue] = useState<T>(value);
  const [focused, setFocused] = useState(false);

  const displayValue = focused ? draft : value;

  const focus = () => {
    setDraft(value);
    setOldValue(value);
    setFocused(true);
  };

  const blur = () => {
    onBlur(draft);
    setFocused(false);
  };

  if (focused && value !== oldValue) {
    setDraft(value);
    setOldValue(value);
  }

  return { displayValue, setDraft, focus, blur };
};
