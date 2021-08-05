import Link from "next/link";
import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { ContentsCard } from "./ContentsCard";

const CONTENTSITEMS = [
  {
    title: "#質問を見る",
    href: "/question",
  },
  {
    title: "#最新のブログ",
    href: "/blog",
  },
];

export const ContentsLayout: VFC = () => {
  return (
    <>
      {CONTENTSITEMS.map((item) => {
        return (
          <div key={item.href}>
            <h1 className="px-14 py-4 font-bold text-xl">{item.title}</h1>
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
              <Link href={item.href}>
                <a>
                  <PrimaryButton>もっと見る</PrimaryButton>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};
