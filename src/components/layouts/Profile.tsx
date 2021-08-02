import React, { VFC } from "react";
import Image from "next/image";

import "tailwindcss/tailwind.css";

export const Profile: VFC = () => {
  return (
    <>
      <div className="mx-14">
        <div className="flex">
          <Image
            src="/img/avatar.png"
            className="rounded-full"
            width={70}
            height={70}
            alt="Avatar"
          />
          <div className="mx-6">
            <p className="text-gray-700">hirocky1983</p>
            <br />
            <p className="text-gray-700">
              <span>🚹</span>　　　　#ベトナム人と交際中
            </p>
          </div>
        </div>
      </div>
      <div className="justify-center box-border my-4 mx-14">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odit
          impedit at, optio voluptatibus aspernatur sint commodi consequatur quo
          vitae, mollitia id reprehenderit assumenda minus. Qui recusandae nobis
          optio officiis.
        </p>
      </div>
    </>
  );
};
