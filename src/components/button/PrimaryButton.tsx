import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

export const PrimaryButton: VFC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <div className="items-center justify-center text-center ">
    <button
      className="bg-gray-400 text-white rounded-lg  hover:bg-gray-300 focus:outline-none w-32 h-16"
      onClick={onClick}
    >
      {children}
    </button>

    </div>
  );
};
