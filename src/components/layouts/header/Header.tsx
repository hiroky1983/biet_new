import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import Image from "next/image";

export const Header: VFC = () => {
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
