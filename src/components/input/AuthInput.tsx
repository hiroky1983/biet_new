import { InputHTMLAttributes, VFC } from "react";
import { Input } from "@chakra-ui/react";

type PROPS = {
  placeholder: string;
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  inputName?: string;
  type: string;
  autoComplete?: string;
  defaultValue?: string;
};
export const AuthInput: VFC<PROPS> = (props) => {
  const {
    placeholder,
    value,
    onChange,
    inputName,
    type,
    autoComplete,
    defaultValue,
  } = props;
  return (
    <div className="mt-4">
      <Input
        padding="2"
        type={type}
        autoComplete={autoComplete}
        name={inputName}
        variant="flushed"
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};
