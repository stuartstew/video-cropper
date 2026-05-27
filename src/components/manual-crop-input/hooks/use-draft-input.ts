import { useState } from "react";

export const useDraftInput = <T>(onBlur: (draft: T) => void) => {
  const [draft, setDraft] = useState<T>();
  const [oldValue, setOldValue] = useState<T>();
  const [focused, setFocused] = useState(false);

  // biome-ignore lint/style/noNonNullAssertion: draft cannot be undefined if focused is true
  const currentValue = (value: T) => (focused ? draft! : value);

  const setDefinedDraft = (value: T) => setDraft(value);

  const focus = (value: T) => {
    setDraft(value);
    setOldValue(value);
    setFocused(true);
  };

  const blur = () => {
    // biome-ignore lint/style/noNonNullAssertion: draft cannot be undefined here
    onBlur(draft!);
    setFocused(false);
  };

  const updateDraftIfValueChanged = (value: T) => {
    if (focused && value !== oldValue) {
      setDraft(value);
      setOldValue(value);
    }
  };

  return { currentValue, setDraft: setDefinedDraft, focus, blur, updateDraftIfValueChanged };
};
