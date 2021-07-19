import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

import {
  AiTwotoneHome,
  AiFillQuestionCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";

const FOOTERITEMS = [
  {
    href: "/",
    element: <AiTwotoneHome className=" w-8 h-8 m-auto" />,
    description: "ホーム",
  },
  {
    href: "/",
    element: <BsFillChatDotsFill className=" w-8 h-8 m-auto" />,
    description: "ひとこと",
  },
  {
    href: "/",
    element: <AiFillQuestionCircle className=" w-8 h-8 m-auto" />,
    description: "質問",
  },
  {
    href: "/",
    element: <HiOutlineBookOpen className=" w-8 h-8 m-auto" />,
    description: "ブログ",
  },
  {
    href: "/",
    element: <AiOutlineSearch className=" w-8 h-8 m-auto" />,
    description: "探す",
  },
];

export const FooterMenu: FC = () => {
  return (
    <>
      <div className="border border-gray-300"></div>
      <div className="flex  justify-between mx-10 my-4">
        {FOOTERITEMS.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a>
                <div
                  className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400"
                >
                  {item.element}
                  <p>{item.description}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
