import * as React from "react";
import { downloadIcon, trashIcon } from "../icons";

export default function TextField({
  className,
  children,
  onDownload,
  onDelete,
  ...rest
}: TextFieldProps) {
  return (
    <div className="w-full rounded-lg text-white bg-black p-2">
      <textarea
        className={`w-full bg-black font-mono resize-none ${className ?? ""}`}
        {...rest}
      >
        {children}
      </textarea>
      <div className="inline-flex">
        <button
          className="opacity-50 hover:opacity-100 animate-pulse"
          onClick={onDownload}
        >
          {downloadIcon}
        </button>
        <button
          className="opacity-50 hover:opacity-100 hover:text-red-500"
          onClick={onDelete}
        >
          {trashIcon}
        </button>
      </div>
    </div>
  );
}

export interface TextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onDownload?: () => Promise<any>;
  onDelete?: () => Promise<any>;
}
