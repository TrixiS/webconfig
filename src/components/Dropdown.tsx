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

  const showMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setMenuVisible(true);
    document.addEventListener("click", closeMenu as any);
  };

  const closeMenu = (e: React.MouseEvent, itemClick: boolean = false) => {
    if (menuRef.current?.contains(e.target as Node) && !itemClick) return;

    setMenuVisible(false);
    document.removeEventListener("click", closeMenu as any);
  };

  const transform = mirror ? "scaleX(-1)" : "scaleX(1)";

  return (
    <ul {...rest} ref={menuRef} style={{ transform: transform }}>
      <Button
        onClick={showMenu}
        {...buttonProps}
        style={{ transform: transform }}
      />
      {menuVisible && (
        <div
          className="flex flex-col flex-grow-0 items-start bg-white shadow-lg rounded-b-lg z-50"
          style={{ transform: transform }}
        >
          {children.map((child, childIndex) => (
            <li
              className={`w-full py-1 px-2 hover:bg-gray-100 ${
                childIndex === children.length - 1 && "rounded-b-lg"
              }`}
              onClick={(e) => closeMenu(e, true)}
              key={childIndex.toString()}
            >
              {child}
            </li>
          ))}
        </div>
      )}
    </ul>
  );
}

export interface DropdownProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactChild[];
  buttonProps: ButtonProps;
  mirror?: boolean;
}
