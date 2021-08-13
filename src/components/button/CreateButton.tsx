import React, { VFC } from "react";

type Props = {
  title?: string;
};

export const CreateButton: VFC<Props> = () => {
  return (
    <div className="items-center">
      <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center">
        +
      </button>
    </div>
  );
};
