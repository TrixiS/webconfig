import * as React from "react";

export function PageTitle({
  children,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className="text-3xl text-gray-800 font-bold mb-4" {...rest}>
      {children}
    </h1>
  );
}

export default function Page({ title, children, ...rest }: PageProps) {
  return (
    <div {...rest}>
      <PageTitle>{title}</PageTitle>
      {children}
    </div>
  );
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}
