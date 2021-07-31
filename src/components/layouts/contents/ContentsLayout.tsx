import Link from "next/link";
import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import { PrimaryButton } from "../../button/PrimaryButton";
import { ContentsCard } from "./ContentsCard";

export const ContentsLayout: VFC = () => {
  return (
    <div>
      <h1 className="px-14 py-4 font-bold text-xl">#質問を見る</h1>
      <div className="justify-center sm:flex mx-6 gap-x-3">
        <ContentsCard />
        <div className="hidden lg:flex">
          <ContentsCard />
        </div>
        <div className="hidden sm:flex">
          <ContentsCard />
        </div>
      </div>
      <div className="my-10 justify-center items-center">
        <Link href="/question">
          <a>
            <PrimaryButton>もっと見る</PrimaryButton>
          </a>
        </Link>
      </div>
      <h1 className="px-14 py-4 font-bold text-xl">#最新のブログ</h1>
      <div className="justify-center sm:flex mx-6 gap-x-3">
        <ContentsCard />
        <div className="hidden lg:flex">
          <ContentsCard />
        </div>
        <div className="hidden sm:flex">
          <ContentsCard />
        </div>
      </div>
      <div className="my-10 justify-center items-center">
        <Link href="/blog">
          <a>
            <PrimaryButton>もっと見る</PrimaryButton>
          </a>
        </Link>
      </div>
    </div>
  );
};
