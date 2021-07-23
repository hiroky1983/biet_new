import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

import { AiTwotoneHome, AiFillQuestionCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";

export const FOOTERITEMS = [
  {
    href: "/",
    element: <AiTwotoneHome className=" w-8 h-8 m-auto" />,
    description: "ホーム",
  },
  {
    href: "/word",
    element: <BsFillChatDotsFill className=" w-8 h-8 m-auto" />,
    description: "ひとこと",
  },
  {
    href: "/question",
    element: <AiFillQuestionCircle className=" w-8 h-8 m-auto" />,
    description: "質問",
  },
  {
    href: "/blog",
    element: <HiOutlineBookOpen className=" w-8 h-8 m-auto" />,
    description: "ブログ",
  },
];

export const MobileFooterMenu: VFC = () => {
  return (
    <>
      <div className="border border-gray-300"></div>
      <div className="flex  justify-between mx-10 my-4">
        {FOOTERITEMS.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a>
                <div className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400">
                  {item.element}
                  <p className="sm:hidden">{item.description}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
