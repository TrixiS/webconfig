import { TextareaHTMLAttributes } from "react";

export default function TextField({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-lg p-2 bg-black text-white font-mono resize-none ${
        className ?? ""
      }`}
      {...rest}
    />
  );
}
