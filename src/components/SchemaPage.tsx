import * as React from "react";
import Input from "../components/Input";
import Page, { PageProps } from "./Page";
import { ConfigProperty } from "../lib/configTypes";
import {
  useForm,
  useFieldArray,
  UseFieldArrayProps,
  UseFormRegister,
  Controller,
} from "react-hook-form";
import { removeIcon, plusIcon } from "../icons";
import DictInput from "./DictInput";

const plainInputTypes: Record<string, string> = {
  string: "text",
  integer: "number",
  number: "number",
};

export function Field({
  title,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col gap-y-1" {...rest}>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
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
  const { fields, append, remove } = useFieldArray(useFieldArrayProps);

  React.useEffect(() => {
    if (property.value?.length) append(property.value, { shouldFocus: false });
  }, []);

  return (
    <Field {...rest}>
      {fields.map((field, fieldIndex) => (
        <RemoveButton
          {...removeButtonProps}
          remove={() => remove(fieldIndex)}
          key={field.id}
        >
          <Input
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
  schemaProperty: property,
  removeButtonProps,
  appendButtonProps,
  ...rest
}: ArrayFieldProps) {
  return (
    <Field {...rest}>
      <Controller
        {...useFieldArrayProps}
        render={({ field }) => (
          <DictInput
            {...field}
            removeButtonProps={removeButtonProps}
            appendButtonProps={appendButtonProps}
            defaultValue={property.value}
          />
        )}
        defaultValue={{}}
      />
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
  onSave,
  ...rest
}: SchemaPageProps) {
  const { control, register, handleSubmit } = useForm();

  return (
    <Page {...rest}>
      <form onSubmit={handleSubmit(onSave)} {...formProps}>
        {Object.entries(schema).map((entry, index) => {
          const [name, property] = entry;

          if (property.type in plainInputTypes) {
            const plainType = plainInputTypes[property.type];

            return (
              <Field title={property.title}>
                <Input
                  type={plainType}
                  placeholder={property.default}
                  defaultValue={property.value}
                  {...register(name, {
                    required: !property.default,
                    valueAsNumber: plainType === "number",
                  })}
                  key={index}
                />
              </Field>
            );
          }

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
                buttonClassName: "text-gray-500 hover:bg-gray-200 rounded-lg",
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
  value?: string | any[];
};

export interface SchemaPageProps extends PageProps {
  schema: Record<string, SchemaProperty>;
  onSave: (data: Record<string, any>) => any;
  formProps?: Record<string, any>;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonClassName?: string;
}

export interface RemoveButtonProps extends ButtonProps {
  remove: (...args: any) => any;
}

export interface AppendButtonProps extends ButtonProps {
  append: (...args: any) => any;
}

export interface ArrayFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  useFieldArrayProps: UseFieldArrayProps;
  register: UseFormRegister<Record<string, string>>;
  schemaProperty: SchemaProperty;
  removeButtonProps: ButtonProps;
  appendButtonProps: ButtonProps;
}
