import * as React from "react";
import Button, { ButtonProps } from "./Button";

export default function Dropdown({
  children,
  buttonProps,
  mirror,
  ...rest
}: DropdownProps) {
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (menuVisible)
      return document.addEventListener("click", closeMenu as any);

    document.removeEventListener("click", closeMenu as any);
  }, [menuVisible]);

  const toggleMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setMenuVisible((visible) => !visible);
  };

  const closeMenu = (e: React.MouseEvent, itemClick: boolean = false) => {
    if (menuRef.current?.contains(e.target as Node) && !itemClick) return;
    setMenuVisible(false);
  };

  const transform = mirror ? "scaleX(-1)" : "scaleX(1)";

  return (
    <ul {...rest} ref={menuRef} style={{ transform: transform }}>
      <Button
        onClick={toggleMenu}
        {...buttonProps}
        style={{ transform: transform }}
      />
      {menuVisible && (
        <div
          className="flex flex-col fixed w-full bg-white shadow-md z-50"
          style={{ transform: transform }}
        >
          {children.map((child, childIndex) => (
            <div
              className="w-full h-full"
              onClick={(e) => closeMenu(e, true)}
              key={childIndex.toString()}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </ul>
  );
}

export function DropdownItem({
  className,
  disabled,
  ...rest
}: DropdownItemProps) {
  const itemClassName = disabled
    ? "bg-gray-100 cursor-not-allowed opacity-50 pointer-events-hover"
    : "hover:bg-gray-100 cursor-pointer";

  return (
    <li
      className={`w-full h-full text-sm py-1 px-2 ${itemClassName} ${className}`}
      {...rest}
    />
  );
}

export interface DropdownProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactChild[];
  buttonProps: ButtonProps;
  mirror?: boolean;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}
