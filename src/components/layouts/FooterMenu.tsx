import React, { FC } from "react";
import "tailwindcss/tailwind.css";

import { AiTwotoneHome, AiFillQuestionCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiOutlineBookOpen } from "react-icons/hi";

export const FooterMenu: FC = () => {
  return (
    <>
      <div className="border border-gray-300"></div>
      <div className="flex  justify-between mx-10 my-4">
        <div className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400">
          <AiTwotoneHome className=" w-8 h-8" />
          <p>ホーム</p>
        </div>
        <div className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400">
          <BsFillChatDotsFill className=" w-8 h-8" />
          <p>つぶやく</p>
        </div>
        <div className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400">
          <AiFillQuestionCircle className=" w-8 h-8" />
          <p>質問</p>
        </div>
        <div className="cursor-pointer box-border m-auto text-blue-500 hover:text-blue-400">
          <HiOutlineBookOpen className=" w-8 h-8" />
          <p>ブログ</p>
        </div>
      </div>
    </>
  );
};
