import React, { InputHTMLAttributes, VFC } from "react";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

type PROPS = {
  placeholder: string;
  id?: string;
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  name?: string;
  type: string;
  autoComplete?: string;
  defaultValue?: string;
  register?: any;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: any;
};
export const AuthInput: VFC<PROPS> = (props) => {
  const {
    id,
    placeholder,
    value,
    onChange,
    name,
    type,
    autoComplete,
    defaultValue,
    register,
    isReadOnly,
    isRequired,
    isInvalid,
  } = props;
  return (
    <div className="mt-4">
      <FormControl id={id}  isInvalid={isInvalid}>
          <Input
            {...register}
            padding="2"
            type={type}
            autoComplete={autoComplete}
            variant="flushed"
            placeholder={placeholder}
            required
            name={name}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
            isInvalid={isInvalid}
          />
          <FormErrorMessage>{isInvalid && isInvalid.message}</FormErrorMessage>
      </FormControl>
    </div>
  );
};
