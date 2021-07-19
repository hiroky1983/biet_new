import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import { ContentsCard } from "../contents/ContentsCard";

export const ContentsLayout: FC = () => {
  return (
    <div>
      <h2 className="px-14 py-4">最新のつぶやき</h2>
      <div className="flex justify-between mx-6">
        <ContentsCard />
        <ContentsCard />
        <ContentsCard />
      </div>
      <h2 className="px-14 py-4">最新のつぶやき</h2>
      <div className="flex justify-between mx-6">
        <ContentsCard />
        <ContentsCard />
        <ContentsCard />
      </div>


    </div>
  );
};
