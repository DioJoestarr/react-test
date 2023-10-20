import classNames from 'classnames';
import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { Controller, ControllerProps } from 'react-hook-form';

export interface InputProps extends Omit<ControllerProps, 'render'> {
  containerClassName?: string;
  containerInputClassName?: string;
  labelClassName?: string;
  label?: string;
  InputWraper?: ({ children }: { children: any }) => any;
  className?: string;
  control: any;
  error?: string
  inputProps?: FormControlProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    containerClassName,
    containerInputClassName,
    labelClassName,
    InputWraper = React.Fragment,
    className,
    error,
    inputProps,
    ...rest
  } = props;

  return (
    <Controller
      {...rest}
      render={({ field, formState: { errors } }) => {
        const { name, onChange} = field;
       
        return (
          <Form.Group className={className}>
            {label && <Form.Label className={classNames(rest.rules?.required && "required")}>{label}</Form.Label>}
         
            <InputWraper>
              <Form.Control
                {...field}

                onChange={onChange}
                {...inputProps}
              />
            </InputWraper>
            {errors[name]?.message && (
              <span className='invalid-message'>
                {errors[name]?.message as any}
              </span>
            )}
            {errors[name]?.type === 'maxLength' && (
              <span className='invalid-message'>Đã vượt quá số ký tự cho chép</span>
            )}
            {error && <span className='invalid-message'>{error}</span>}

          </Form.Group>
        );
      }}
    />
  );
});

Input.displayName = 'Input';

export default React.memo(Input);
