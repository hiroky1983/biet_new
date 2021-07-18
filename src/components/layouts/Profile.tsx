import React, { FC } from "react";
import Image from "next/image";

import "tailwindcss/tailwind.css";

export const Profile: FC = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex">
          <Image
            src="/img/avatar.png"
            className="rounded-full"
            width={70}
            height={70}
            alt="Avatar"
          />
          <div className="">
            <p>hirocky1983</p>
            <br />
            <p>
              <span>🚹</span>　　　　#ベトナム人と交際中
            </p>
          </div>
        </div>
      </div>
      <div className="justify-center box-border my-4 mx-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odit
          impedit at, optio voluptatibus aspernatur sint commodi consequatur quo
          vitae, mollitia id reprehenderit assumenda minus. Qui recusandae nobis
          optio officiis.
        </p>
      </div>
    </>
  );
};
