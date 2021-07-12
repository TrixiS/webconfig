import * as React from "react";
import Page, { PageProps } from "./Page";
import { ConfigProperty } from "../lib/configTypes";
import {
  useForm,
  useFieldArray,
  Controller,
  UseFieldArrayProps,
  UseFormRegister,
} from "react-hook-form";
import { removeIcon, plusIcon } from "../icons";

const plainInputTypes: Record<string, string> = {
  string: "text",
  integer: "number",
  number: "number",
};

function ObjectField() {
  return null;
}

export function Field({
  title,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col gap-y-1" {...rest}>
      <h3 className="text-xl font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function ArrayField({
  useFieldArrayProps,
  register,
  schemaProperty: property,
  addButtonClassName,
  removeButtonClassName,
  ...rest
}: ArrayFieldProps) {
  // TODO: grab data from property and push it to the fields
  const { fields, append, remove } = useFieldArray(useFieldArrayProps);

  return (
    <Field {...rest}>
      {fields.map((field, fieldIndex) => (
        <div className="flex flex-row gap-x-1" key={field.id}>
          <input
            {...register(`${useFieldArrayProps.name}[${fieldIndex}]`, {
              required: true,
            })}
          />
          <button
            className={removeButtonClassName}
            type="button"
            onClick={() => remove(fieldIndex)}
          >
            {removeIcon}
          </button>
        </div>
      ))}
      <div>
        <button
          className={addButtonClassName}
          type="button"
          onClick={() => append("")}
        >
          {plusIcon}
        </button>
      </div>
    </Field>
  );
}

export default function SchemaPage({
  schema,
  formProps,
  children,
  ...rest
}: SchemaPageProps) {
  // TODO: decide how to convert list to object
  // TODO: make inteface from object (?)
  const { control, register, handleSubmit } = useForm();
  const handleData = (data: any) => console.log(data);

  return (
    <Page {...rest}>
      <form onSubmit={handleSubmit(handleData)} {...formProps}>
        {Object.entries(schema).map((entry, index) => {
          const [name, property] = entry;

          if (property.type in plainInputTypes)
            return (
              <Field title={property.title}>
                <input
                  type={plainInputTypes[property.type]}
                  placeholder={property.default}
                  {...register(name, { required: !property.default })}
                />
              </Field>
            );

          if (property.type === "array")
            return (
              <ArrayField
                title={property.title}
                useFieldArrayProps={{ control, name }}
                register={register}
                schemaProperty={property}
                addButtonClassName="text-gray-500 hover:bg-gray-200 rounded"
                removeButtonClassName="text-gray-500 hover:text-red-500"
              />
            );

          return <ObjectField />;
        })}

        <div>{children}</div>
      </form>
    </Page>
  );
}

export type SchemaProperty = ConfigProperty & {
  value?: string;
};

export interface SchemaPageProps extends PageProps {
  schema: Record<string, SchemaProperty>;
  formProps?: Record<string, any>;
}

interface ArrayFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  useFieldArrayProps: UseFieldArrayProps;
  register: UseFormRegister<Record<string, string>>;
  schemaProperty: SchemaProperty;
  addButtonClassName?: string;
  removeButtonClassName?: string;
}
