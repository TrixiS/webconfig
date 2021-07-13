import * as React from "react";
import { arrowRightIcon } from "../icons";
import Input from "./Input";
import {
  AppendButton,
  AppendButtonProps,
  RemoveButton,
  RemoveButtonProps,
} from "./SchemaPage";

// TODO: take property type
const DictInput = ({
  removeButtonProps,
  appendButtonProps,
  onChange,
}: DictInputProps) => {
  const [values, setValues] = React.useState<any[][]>([]);

  React.useEffect(() => {
    if (values.length === 0) return;

    const object: Record<string, any> = {};

    for (const pair of values) {
      const [key, value] = pair;
      if (key !== undefined && value !== undefined) object[key] = value;
    }

    onChange(object);
  }, [values]);

  const changePair = (pairIndex: number, valueIndex: number, value: any) =>
    setValues((v) => {
      const valuesCopy = [...v];
      valuesCopy[pairIndex][valueIndex] = value;
      return valuesCopy;
    });

  return (
    <>
      {values.map((pair, index) => (
        <RemoveButton
          {...removeButtonProps}
          remove={() =>
            setValues((v) => {
              const valuesCopy = [...v];
              valuesCopy.splice(index, 1);
              return valuesCopy;
            })
          }
          key={index}
        >
          <Input
            type="text"
            defaultValue={pair[0]}
            onChange={(e) => changePair(index, 0, e.target.value)}
          />
          <span className="text-gray-500 self-center">{arrowRightIcon}</span>
          <Input
            defaultValue={pair[1]}
            onChange={(e) => changePair(index, 1, e.target.value)}
          />
        </RemoveButton>
      ))}
      <AppendButton
        {...appendButtonProps}
        append={() => setValues((v) => [...v, Array(2)])}
      />
    </>
  );
};

export default React.forwardRef<HTMLDivElement, DictInputProps>(DictInput);

export interface DictInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange: (...args: any) => any;
  removeButtonProps: Omit<RemoveButtonProps, "remove">;
  appendButtonProps: Omit<AppendButtonProps, "append">;
}
