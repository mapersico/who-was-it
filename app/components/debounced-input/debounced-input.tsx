"use client";

import { useEffect, useRef } from "react";

interface DebouncedInputProps {
  placeholder?: string;
  delay?: number;
  className?: string;
  type?: string;
  value?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const DebouncedInput = ({
  onChange,
  delay = 500,
  className,
  placeholder = "Type something...",
  type = "text",
  value = "",
  onFocus,
  onBlur,
}: DebouncedInputProps) => {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (value === "") return;

    const handler = setTimeout(() => {
      onChangeRef.current(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default DebouncedInput;
