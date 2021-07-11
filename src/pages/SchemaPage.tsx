import * as React from "react";
import Page, { PageProps } from "../components/Page";
import { ConfigProperty } from "../lib/configTypes";

export function SchemaField({ schemaProperty, ...rest }: SchemaFieldProps) {
  // TODO: hold state
  //       decide the type of input basing on the prop.type
  //       get form from rest and use it in input

  return (
    <div>
      <h2></h2>
      <input></input>
    </div>
  );
}

export default function SchemaPage({ schema, ...rest }: SchemaPageProps) {
  return (
    <Page {...rest}>
      {schema.map((p) => (
        <SchemaField schemaProperty={p} />
      ))}
    </Page>
  );
}

export type SchemaProperty = ConfigProperty & {
  value?: string;
};

export interface SchemaPageProps extends PageProps {
  schema: SchemaProperty[];
}

export interface SchemaFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  schemaProperty: SchemaProperty;
}
