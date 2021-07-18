import React, { FC } from "react";
import "tailwindcss/tailwind.css";

import { AiTwotoneHome, AiFillQuestionCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";

const FOOTERITEMS = [
  {
    element: <AiTwotoneHome className=" w-8 h-8 m-auto" />,
    description: "ホーム",
  },
  {
    element: <BsFillChatDotsFill className=" w-8 h-8 m-auto" />,
    description: "つぶやく",
  },
  {
    element: <AiFillQuestionCircle className=" w-8 h-8 m-auto" />,
    description: "質問",
  },
  {
    element: <HiOutlineBookOpen className=" w-8 h-8 m-auto" />,
    description: "ブログ",
  },
];

export const FooterMenu: FC = () => {
  return (
    <>
      <div className="border border-gray-300"></div>
      <div className="flex  justify-between mx-10 my-4">
        {FOOTERITEMS.map((item) => {
          return (
            <div
              key={item.description}
              className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400"
            >
              {item.element}
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
