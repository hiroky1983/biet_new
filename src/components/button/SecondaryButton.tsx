import { useRouter } from "next/router";
import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const SecondaryButton: VFC<Props> = (props) => {
  const { children, onClick } = props;
  const router = useRouter();
  const nomalClass =
    "bg-blue-500 text-white hover:bg-blue-400 focus:outline-none w-20 h-10 rounded-full";
  const authClass =
    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  return (
    <div className="text-center ">
      <button
        onClick={onClick}
        className={(router.pathname = "/auth" ? authClass : nomalClass)}
      >
        {children}
      </button>
    </div>
  );
};
