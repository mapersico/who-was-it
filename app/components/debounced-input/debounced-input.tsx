"use client";

import { useEffect, useRef } from "react";

interface DebouncedInputProps {
  placeholder?: string;
  delay?: number;
  className?: string;
  onChange: (value: string) => void;
  type?: string;
  value?: string;
}

const DebouncedInput = ({
  onChange,
  delay = 500,
  className,
  placeholder = "Type something...",
  type = "text",
  value = "",
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
    />
  );
};

export default DebouncedInput;
