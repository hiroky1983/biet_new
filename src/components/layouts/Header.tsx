import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import Image from "next/image";


import { FaHandshake } from "react-icons/fa";

export const Header: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="p-6 cursor-pointer">
        <Image
         src="/img/biet-new.png"
         className="cursor-pointer"
         width={420}
         height={80}
         alt="Avatar"
        />
      </div>
    </div>
  );
};
