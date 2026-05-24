import { NumberInput } from "@mantine/core";
import { useDraftInput } from "../hooks/use-draft-input";

type Props = {
  value: number;
  onChange: (value: number) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  size?: string;
  w?: string | number;
};

export const NonNegativeIntegerInput = ({ value, onChange, label, disabled, size, w }: Props) => {
  const { currentValue, setDraft, focus, blur, updateDraftIfValueChanged } = useDraftInput<string | number>((draft) => {
    const clampedValue = typeof draft === "number" ? draft : 0;
    onChange(clampedValue);
  });

  updateDraftIfValueChanged(value);

  return (
    <NumberInput
      value={currentValue(value)}
      onChange={setDraft}
      onFocus={() => focus(value)}
      onBlur={blur}
      allowDecimal={false}
      allowLeadingZeros={false}
      allowNegative={false}
      hideControls
      label={label}
      disabled={disabled}
      size={size}
      w={w}
    />
  );
};
