import React, { useState, VFC } from "react";
import Image from "next/image";
import { SecondaryButton } from "../../components/button/SecondaryButton";

import { auth, db, storage } from "../../../firebase";
import { ProfileEdit } from "./ProfileEdit";

type USER = {
  displayName: string;
  lang: string;
  checkValue: string;
  userStatus: string;
};

export const Profile: VFC = () => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [user, setUser] = useState<USER>({
    displayName: "",
    lang: "",
    checkValue: "",
    userStatus: "",
  });
  
  const onChangeImageHandler = async (
    e: {
      target: { files: any; value: string };
    }
    // email: string,
    // password: string
  ) => {
    // const authUser = await auth.createUserWithEmailAndPassword(email, password);
    if (e.target.files![0]) {
      let url = "";
      if (avatarImage) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        )
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + avatarImage.name;
        await storage.ref(`avatars/${fileName}`).put(avatarImage);
        url = await storage.ref("avatars").child(fileName).getDownloadURL();
      }
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };



  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onClickChangeProfile = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="mx-14 w-auto">
        <div className="flex w-full">
          <label>
            <input
              type="file"
              onChange={onChangeImageHandler}
              className="hidden"
            />
            <Image
              src="/img/avatar.png"
              className="rounded-full text-center"
              width={70}
              height={70}
              alt="Avatar"
            />
          </label>
          <div className="mx-8 ">
            <p className="text-gray-700">{user.displayName}</p>
            <br />
            <p className="text-gray-700">
              <span>{user.checkValue}</span>{" "}
              {`${user.lang}と${user.userStatus}`}
            </p>
          </div>
          <div className="float-right">
            <SecondaryButton onClick={onClickChangeProfile}>
              変更
            </SecondaryButton>
            {open && (
              <ProfileEdit
                open={open}
                handleClose={handleClose}
                onClickChangeProfile={onClickChangeProfile}
              />
            )}
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
