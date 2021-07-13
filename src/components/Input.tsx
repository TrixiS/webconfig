import * as React from "react";

export default function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={
        "rounded-lg border border-gray-200 py-1 px-2 focus:outline-none focus:border-gray-400 break-words"
      }
      {...rest}
    />
  );
}
