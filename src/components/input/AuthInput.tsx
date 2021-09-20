import { InputHTMLAttributes, VFC } from "react";
import { Input } from "@chakra-ui/react";

type PROPS = {
  placeholder: string;
  value?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  name?: string;
  type: string;
  autoComplete?: string;
  defaultValue?: string;
  register?: any;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
};
export const AuthInput: VFC<PROPS> = (props) => {
  const {
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
      <Input
        {...register}
        padding="2"
        type={type}
        autoComplete={autoComplete}
        name={name}
        variant="flushed"
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isInvalid={isInvalid}
      />
    </div>
  );
};
