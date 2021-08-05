import React, { VFC } from "react";
import Image from "next/image";
import { SecondaryButton } from "../components/button/SecondaryButton";

import "tailwindcss/tailwind.css";

export const Profile: VFC = () => {
  return (
    <>
      <div className="mx-14 w-auto">
        <div className="flex w-full">
          <Image
            src="/img/avatar.png"
            className="rounded-full text-center"
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
          <div className="float-right">
            <SecondaryButton>変更</SecondaryButton>
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
