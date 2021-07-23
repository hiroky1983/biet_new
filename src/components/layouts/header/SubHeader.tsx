import React, { Children, VFC } from "react";
import { ReactNode } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  title: string
}

export const SubHeader: VFC<Props> = (props) => {
  return (
    <div className="flex justify-center">
      <div className="p-6 cursor-pointer">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
};
