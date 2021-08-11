import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

export const SecondaryButton: VFC<Props> = (props) => {
  const { children, onClick} = props;
  return (
    <div className="text-center ">
      <button onClick={onClick} className="bg-blue-500 text-white hover:bg-blue-400 focus:outline-none w-20 h-10 rounded-full">
        {children}
      </button>
    </div>
  );
};
