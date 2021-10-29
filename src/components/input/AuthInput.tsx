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
  } = props;
  return (
    <div className="mt-4">
      <Input
        {...register}
        padding="2"
        fontSize="lg"
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
      />
    </div>
  );
};
