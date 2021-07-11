import * as React from "react";
import { Link } from "react-router-dom";

function SidebarHideItem({ icon, children }: SidebarItemProps) {
  return (
    <>
      {icon}
      <div className="hidden sm:flex h-full">{children}</div>
    </>
  );
}

export function SidebarItem({ icon, children, ...rest }: SidebarItemProps) {
  return (
    <li className="flex flex-col h-10 hover:bg-gray-200 rounded text-base font-semibold text-gray-700 cursor-pointer">
      <div className="inline-flex h-full m-2 gap-x-2 self-center sm:self-start sm:items-start">
        <SidebarHideItem icon={icon}>{children}</SidebarHideItem>
      </div>
    </li>
  );
}

export function SidebarLogo({ children, ...rest }: SidebarItemProps) {
  return (
    <div className="inline-flex h-12 w-full gap-x-2 justify-center sm:justify-start mt-2 sm:mt-0 ml-0 sm:ml-2">
      <SidebarHideItem {...rest}>
        <div className="text-sm lg:text-base md:mt-1 xl:mt-0 xl:text-2xl font-bold">
          {children}
        </div>
      </SidebarHideItem>
    </div>
  );
}

export function Sidebar({
  children,
  className,
  icon: logo,
  ...rest
}: SidebarItemProps) {
  return (
    <div className={`flex flex-col ${className}`} {...rest}>
      <div className="m-2 md:m-4">
        {logo}
        <ul className="flex flex-col w-full">{children}</ul>
      </div>
    </div>
  );
}

export function Header({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={`h-16 w-full ${className}`} {...rest} />;
}

export function Content({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-gray-100 w-full h-full overflow-y-auto`}>
      <div className={`m-4 md:m-8 ${className}`} {...rest} />
    </div>
  );
}

export function SidebarLink({ to, ...rest }: SidebarLinkProps) {
  return (
    <Link to={to}>
      <SidebarItem {...rest} />
    </Link>
  );
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

export interface SidebarLinkProps extends SidebarItemProps {
  to: string;
}
