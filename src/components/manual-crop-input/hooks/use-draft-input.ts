import { useState } from "react";

export const useDraftInput = <T>(savedValue: T, onBlur: (draft: T) => void) => {
  const [draft, setDraft] = useState<T>(savedValue);
  const [prevValue, setPrevValue] = useState<T>(savedValue);
  const [focused, setFocused] = useState(false);

  const displayValue = focused ? draft : savedValue;

  const focus = () => {
    setDraft(savedValue);
    setPrevValue(savedValue);
    setFocused(true);
  };

  const blur = () => {
    onBlur(draft);
    setFocused(false);
  };

  if (focused && savedValue !== prevValue) {
    setDraft(savedValue);
    setPrevValue(savedValue);
  }

  return { displayValue, setDraft, focus, blur };
};
