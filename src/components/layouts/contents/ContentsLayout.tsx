import Link from "next/link";
import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import { PrimaryButton } from "../../button/PrimaryButton";
import { ContentsCard } from "./ContentsCard";

export const ContentsLayout: FC = () => {
  return (
    <div>
      <h1 className="px-14 py-4 font">#最新のつぶやき</h1>
      <div className="flex justify-between mx-6">
        <ContentsCard />
        <ContentsCard />
        <ContentsCard />
      </div>
      <div className="my-10 justify-center items-center">
        <Link  href="/word">
          <a>
            <PrimaryButton>もっと見る</PrimaryButton>
          </a>
        </Link>
      </div>
      <h1 className="px-14 py-4 font">#質問を見る</h1>
      <div className="flex justify-between mx-6">
        <ContentsCard />
        <ContentsCard />
      </div>
      <div className="my-10 justify-center items-center">
      <Link  href="/question">
          <a>
            <PrimaryButton>もっと見る</PrimaryButton>
          </a>
        </Link>
      </div>
      <h1 className="px-14 py-4 font">#最新のブログ</h1>
      <div className="flex justify-between mx-6">
        <ContentsCard />
      </div>
      <div className="my-10 justify-center items-center">
      <Link  href="/blog">
          <a>
            <PrimaryButton>もっと見る</PrimaryButton>
          </a>
        </Link>
      </div>
    </div>
  );
};
