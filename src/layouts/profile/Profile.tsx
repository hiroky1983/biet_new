import React, { TextareaHTMLAttributes, useState, VFC } from "react";
import Image from "next/image";
import { SecondaryButton } from "../../components/button/SecondaryButton";

import { auth, db, storage } from "../../../firebase";
import { ProfileEdit } from "./ProfileEdit";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserProfile } from "../../lib/auth";

export const Profile: VFC = () => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [profile, setProfile] =
    useState<string>("プロフィールはまだありません");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const username = user.displayName;

  const onChangeProfile: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (e) => {
    setProfile(e.target.value);
  };

  const onChangeImageHandler = async (e: any) => {
    const authUser = auth.currentUser;
    const file = e.target.files[0];
    const value = e.target.value;
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser!.updateProfile({ photoURL: url });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
    // setAvatarImage(file);
    //  value("")
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
              src={"/img/avatar.png"}
              className="rounded-full text-center cursor-pointer"
              width={70}
              height={70}
              alt="Avatar"
            />
          </label>
          <div className="mx-8 ">
            <p className="text-gray-700">{user.displayName}</p>
            <br />
            <p className="text-gray-700">
              {/* <span>{user.checkValue}</span>{" "}
              {`${user.lang}と${user.userStatus}`} */}
            </p>
          </div>

          <SecondaryButton onClick={onClickChangeProfile}>変更</SecondaryButton>
          {open && (
            <ProfileEdit
              open={open}
              handleClose={handleClose}
              onClickChangeProfile={onClickChangeProfile}
              onChangeProfile= {onChangeProfile}
            />
          )}
        </div>
      </div>
      <div className="justify-center box-border my-4 mx-14">
        <p className="text-gray-700">{profile}</p>
      </div>
    </>
  );
};
