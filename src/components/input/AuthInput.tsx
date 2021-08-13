import { ChangeEventHandler, VFC } from "react";

type PROPS = {
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputName: string;
  type: string;
  autoComplete: string;
};
export const AuthInput: VFC<PROPS> = (props) => {
  const { placeholder, value, onChange, inputName, type, autoComplete } = props;
  return (
    <div>
      <input
        name={inputName}
        type={type}
        autoComplete={autoComplete}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
