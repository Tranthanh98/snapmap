import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface TextInputUIProps extends TextInputProps {
  className?: string;
}

export default function TextInputUI({ className, ...props }: TextInputUIProps) {
  return (
    <TextInput
      className={`px-4 py-3 rounded-full border bg-gray-100 text-gray-900 border-gray-200 dark:border-gray-700 focus:border-primary ${className}`}
      {...props}
    />
  );
}
