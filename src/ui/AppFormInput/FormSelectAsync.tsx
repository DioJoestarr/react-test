import React from "react";
import { Form } from "react-bootstrap";
import { Controller, ControllerProps } from "react-hook-form";
import { Props } from "react-select";
import SelectAsync, { AsyncSelectType } from "../../shared/SelectAsync";

interface FormSelectProps extends Omit<ControllerProps, "render"> {
  selectProps: AsyncSelectType;
  label?: string;
  className?: string;
  control: any;
  error?: string;
  promiseOptions?: any;
}

const FormSelect: React.FC<FormSelectProps> = React.forwardRef(
  ({ selectProps, label, className, promiseOptions, error, ...props }, ref) => {
    const { options, isMulti = false } = selectProps;
    return (
      <Controller
        {...props}
        render={({ field, formState: { errors } }) => {
          const { name, onChange, value } = field;
          const selectValue = isMulti
            ? options?.filter((c: any) => value?.includes(c.value)) || undefined
            : options?.find((c: any) => value == c.value) || undefined;

          return (
            <Form.Group className={className}>
              {label && (
                <Form.Label
                  className={props?.rules?.required ? "required" : ""}
                >
                  {label}
                </Form.Label>
              )}
              <SelectAsync
                {...field}
                loadOptions={promiseOptions}
                value={selectValue}
                onChange={(v: any, e) => {
                  const onChangeValue = isMulti
                    ? v.map((c: any) => c?.value)
                    : v?.value;
                  onChange(onChangeValue, e);
                }}
                placeholder=""
                {...selectProps}
              />
              {errors[name]?.message && (
                <span className="invalid-message">
                  {errors[name]?.message as any}
                </span>
              )}
              {error && <span className="invalid-message">{error}</span>}
            </Form.Group>
          );
        }}
      />
    );
  }
);

export default React.memo(FormSelect);
