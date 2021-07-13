import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    className={
      "rounded-lg border border-gray-200 py-1 px-2 focus:outline-none focus:border-gray-400"
    }
    {...props}
    ref={ref}
  />
));

export default Input;
