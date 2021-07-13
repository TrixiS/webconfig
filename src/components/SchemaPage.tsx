import * as React from "react";
import Page, { PageProps } from "./Page";
import { ConfigProperty } from "../lib/configTypes";
import {
  useForm,
  useFieldArray,
  UseFieldArrayProps,
  UseFormRegister,
} from "react-hook-form";
import { removeIcon, plusIcon, arrowRightIcon } from "../icons";

const plainInputTypes: Record<string, string> = {
  string: "text",
  integer: "number",
  number: "number",
};

const transformData = (data: Record<string, any>) => {
  const dataCopy = { ...data };

  for (const [key, value] of Object.entries(dataCopy)) {
    if (
      typeof value !== "object" ||
      value[0] === undefined ||
      value[0].length < 2
    )
      continue;

    const object: Record<any, any> = {};
    for (const array of value) object[array[0]] = array[1];
    dataCopy[key] = object;
  }

  return dataCopy;
};

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

export function RemoveButton({
  remove,
  buttonClassName,
  children,
  ...rest
}: RemoveButtonProps) {
  return (
    <div className="inline-flex gap-x-1" {...rest}>
      {children}
      <button className={buttonClassName} type="button" onClick={remove}>
        {removeIcon}
      </button>
    </div>
  );
}

export function AppendButton({
  buttonClassName,
  append,
  ...rest
}: AppendButtonProps) {
  return (
    <div {...rest}>
      <button className={buttonClassName} type="button" onClick={append}>
        {plusIcon}
      </button>
    </div>
  );
}

export function ArrayField({
  useFieldArrayProps,
  register,
  schemaProperty: property,
  appendButtonProps,
  removeButtonProps,
  ...rest
}: ArrayFieldProps) {
  // TODO: grab data from property and push it to the fields
  const { fields, append, remove } = useFieldArray(useFieldArrayProps);

  return (
    <Field {...rest}>
      {fields.map((field, fieldIndex) => (
        <RemoveButton
          {...removeButtonProps}
          remove={() => remove(fieldIndex)}
          key={field.id}
        >
          <input
            {...register(`${useFieldArrayProps.name}[${fieldIndex}]`, {
              required: true,
            })}
          />
        </RemoveButton>
      ))}
      <AppendButton {...appendButtonProps} append={() => append("")} />
    </Field>
  );
}

export function ObjectField({
  useFieldArrayProps,
  register,
  schemaProperty: property,
  removeButtonProps,
  appendButtonProps,
  ...rest
}: ArrayFieldProps) {
  const { fields, append, remove } = useFieldArray(useFieldArrayProps);

  return (
    <Field {...rest}>
      {fields.map((field, fieldIndex) => (
        <RemoveButton
          {...removeButtonProps}
          remove={() => remove(fieldIndex)}
          key={field.id}
        >
          <input
            {...register(`${useFieldArrayProps.name}[${fieldIndex}][0]`, {
              required: true,
            })}
          />
          <span className="text-gray-500">{arrowRightIcon}</span>
          <input
            {...register(`${useFieldArrayProps.name}[${fieldIndex}][1]`, {
              required: true,
            })}
          />
        </RemoveButton>
      ))}
      <AppendButton {...appendButtonProps} append={() => append(Array(2))} />
    </Field>
  );
}

export function NestedObjectField({
  schemaProperty,
  ...rest
}: ArrayFieldProps) {
  if (schemaProperty.type === "array")
    return <ArrayField schemaProperty={schemaProperty} {...rest} />;

  if (schemaProperty.type === "object")
    return <ObjectField schemaProperty={schemaProperty} {...rest} />;

  return null;
}

export default function SchemaPage({
  schema,
  formProps,
  children,
  ...rest
}: SchemaPageProps) {
  const { control, register, handleSubmit } = useForm();

  const handleData = (data: Record<string, any>) => {
    console.log(transformData(data));
  };

  // TODO1: send request to modify config
  // TODO2: fill up fields with actual data

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
                  key={index}
                />
              </Field>
            );

          return (
            <NestedObjectField
              title={property.title}
              useFieldArrayProps={{ control, name }}
              register={register}
              schemaProperty={property}
              removeButtonProps={{
                buttonClassName: "text-gray-500 hover:text-red-500",
              }}
              appendButtonProps={{
                buttonClassName: "text-gray-500 hover:bg-gray-200 rounded",
              }}
              key={index}
            />
          );
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

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonClassName?: string;
}

interface RemoveButtonProps extends ButtonProps {
  remove: (...args: any) => any;
}

interface AppendButtonProps extends ButtonProps {
  append: (...args: any) => any;
}

interface ArrayFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  useFieldArrayProps: UseFieldArrayProps;
  register: UseFormRegister<Record<string, string>>;
  schemaProperty: SchemaProperty;
  removeButtonProps: ButtonProps;
  appendButtonProps: ButtonProps;
}
