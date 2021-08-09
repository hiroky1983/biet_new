import React, { useState, VFC } from "react";
import Image from "next/image";
import { SecondaryButton } from "../components/button/SecondaryButton";

import "tailwindcss/tailwind.css";
import { db } from "../../firebase";

type USER = {
  displayName?: string;
  lang?: string;
  checkValue?: string;
  userStatus?: string;
};

export const Profile: VFC = () => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  // const [user, setUser] = useState<USER>({
  //   displayName: "",
  //   lang: "",
  //   checkValue: "",
  //   userStatus: "",
  // });
  const onChangeImageHandler = (e: {
    target: { files: any; value: string };
  }) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const useRef = db.collection("users").doc("hlxpzjFsxK59rAUWPpNl");
  const userData = useRef.get().then((doc) => {
    const user = doc.data();
    console.log(user);
    return user;
  });  

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
