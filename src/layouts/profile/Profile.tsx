import React, { TextareaHTMLAttributes, useState, VFC } from "react";
import Image from "next/image";
import { SecondaryButton } from "../../components/button/SecondaryButton";

import { auth, db, storage } from "../../../firebase";
import { ProfileEdit } from "./ProfileEdit";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserProfile } from "../../lib/auth";
import { useEffect } from "react";

export const Profile: VFC = () => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [profile, setProfile] =
    useState<string>("プロフィールはまだありません");
  const [lang, setLang] = useState("");
  const [gender, setGender] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const user = useSelector(selectUser);
  const username = user.displayName;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    profile,
    lang,
    userStatus,
    gender,
  });
  const userProfile = () => {
    if (userData) {
      return (
        <>
          <span>{gender}</span>
          <span>{`${lang}と${userStatus}`}</span>
        </>
      );
    } else {
      <span>プロフィールはまだありません</span>;
    }
  };
  const docRef = db.collection("users").doc(user.uid).get();

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
  useEffect(() => {
    const unSub = docRef.then((doc) => {
      setProfile(doc.data()?.profile);
      setGender(doc.data()?.gender);
      setLang(doc.data()?.lang);
      setUserStatus(doc.data()?.userStatus);
      if (user.photoUrl) {
        setAvatarImage(doc.data()?.avatarImage);
      }
    });
    return () => {
      unSub;
    };
  }, [docRef, user.photoUrl]);

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
    db.collection("users").doc(user.uid).update({
      avatarImage: user.photoUrl,
    });
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
          <div>
            <label>
              <input
                type="file"
                onChange={onChangeImageHandler}
                className="hidden"
                onClick={handleImageChage}
              />
              <Image
                src={avatarImage ? user.photoUrl : "/img/avatar.png"}
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
            <p className="text-gray-700">{userProfile()}</p>
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
              // // lang={lang}
              // gender={gender}
              // userStatus={userStatus}
              // setLang={setLang}
              // setGender={setGender}
              // setUserStatus={setUserStatus}
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
