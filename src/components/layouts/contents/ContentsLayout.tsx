import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import { PrimaryButton } from "../../button/PrimaryButton";
import { ContentsCard } from "./ContentsCard";

export const ContentsLayout: FC = () => {
  return (
    <div>
      <h2 className="px-14 py-4">最新のつぶやき</h2>
      <div className="flex justify-between mx-6">
        <ContentsCard />
        <ContentsCard />
        <ContentsCard />
      </div>
      <div className="my-12 justify-center items-center">
        <PrimaryButton>もっと見る</PrimaryButton>
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
