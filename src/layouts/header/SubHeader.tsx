import React from "react";
import type { VFC } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  title: string;
};

export const SubHeader: VFC<Props> = (props) => {
  return (
    <div className="flex justify-center p-8  h-36">
      <div className="p-5 cursor-pointer">
        <h1 className="font-bold text-gray-700 text-3xl">{props.title}</h1>
      </div>
    </div>
  );
};
