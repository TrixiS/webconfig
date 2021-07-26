import * as React from "react";

export default function Button({
  className,
  children,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex gap-x-2 items-center rounded-lg border border-gray-200 bg-blue-500 hover:bg-blue-600 px-4 py-2 focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...rest}
    >
      {icon}
      <span className="text-white text-lg font-medium">{children}</span>
    </button>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
}
