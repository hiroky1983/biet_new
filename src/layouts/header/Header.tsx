import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import Image from "next/image";

export const Header: VFC = () => {
  return (
    <div className="flex justify-center h-36">
      <div className="p-6 cursor-pointer">
        <Image
          src="/img/biet-new-removebg-preview.png"
          className="cursor-pointer"
          width={460}
          height={100}
          alt="Avatar"
        />
      </div>
    </div>
  );
};
