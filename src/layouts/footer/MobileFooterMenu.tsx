import React from "react";
import type { VFC } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

import { AiTwotoneHome, AiFillQuestionCircle } from "react-icons/ai";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { auth } from "../../../firebase";

export const FOOTERITEMS = [
  {
    href: "/",
    element: <AiTwotoneHome className=" w-8 h-8 m-auto" />,
    description: "ホーム",
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
  {
    href: "/auth",
    element: <BiLogIn className=" w-8 h-8 m-auto" />,
    description: "ログアウト",
    onclick: () => {
      auth.signOut();
    },
  },
];
const THIS_YEAR = new Date().getFullYear();

export const MobileFooterMenu: VFC = () => {
  return (
    <div className="fixed bottom-0 z-10 w-full bg-white bg-opacity-60">
      <div className="border border-gray-300"></div>
      <div className="flex  justify-between mx-6 my-4 z-50">
        {FOOTERITEMS.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a>
                <div
                  className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400"
                  onClick={item.onclick}
                >
                  {item.element}
                  <p>{item.description}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div>
        <small className="text-gray-500" lang="en">
          &copy; {THIS_YEAR} hirocky1983 All Rights Reserved.
        </small>
      </div>
    </div>
  );
};
