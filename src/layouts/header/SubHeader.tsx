import React, { Children, VFC } from "react";
import { ReactNode } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  title: string;
};

export const SubHeader: VFC<Props> = (props) => {
  return (
    <div className="flex justify-center p-8">
      <div className="p-5 cursor-pointer">
        <h1 className="font-bold text-lg text-gray-700">{props.title}</h1>
      </div>
    </div>
  );
};
