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
  const userData = db.collection("users").doc().get();

  const onChangeProfile: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (e) => {
      setProfile(e.target.value);
    };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleImageChage = async () => {
    const authUser = auth.currentUser;
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
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const onClickChangeProfile = () => {
    setOpen(true);
  };

  console.log(user.photoUrl);

  return (
    <>
      <div className="mx-14 w-auto">
        <div className="flex w-full">
          <div>
            <label>
              <input
                type="file"
                onChange={onChangeImageHandler}
                className="hidden"
                onClick={handleImageChage}
              />
              <Image
                src={"/img/avatar.png"}
                className="rounded-full text-center cursor-pointer"
                width={70}
                height={70}
                alt="Avatar"
              />
            </label>
          </div>
          <div className="mx-8 ">
            <p className="text-gray-700">{user.displayName}</p>
            <br />
            {/* <p className="text-gray-700">
              <span>{user.gender}</span>
              {`${user.lang}と${user.userStatus}`}
            </p> */}
          </div>
          <div className="flex-auto ">
            <SecondaryButton onClick={onClickChangeProfile}>
              変更
            </SecondaryButton>
          </div>
          {open && (
            <ProfileEdit
              open={open}
              handleClose={handleClose}
              onClickChangeProfile={onClickChangeProfile}
              onChangeProfile={onChangeProfile}
              profile={profile}
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
