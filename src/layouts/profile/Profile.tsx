import React, { TextareaHTMLAttributes, useState, VFC } from "react";
import Image from "next/image";

import { auth, db, storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserProfile } from "../../lib/auth";
import { useEffect } from "react";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { AuthInput } from "../../components/input/AuthInput";
import { useAlert } from "../../hooks/useAlert";

export const Profile: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const username = user.displayName;
  const doc = async () => await db.collection("users").doc(user.uid).get();
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [profile, setProfile] = useState("");
  const [lang, setLang] = useState("");
  const [gender, setGender] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<React.SetStateAction<any> | null>(
    null
  );
  const doneSave = useAlert("認証に成功しました", "success");
  const undoneSave = useAlert("保存に失敗しました", "error");

  useEffect(() => {
    const InitialUserData = async () => {
      const doc = await db.collection("users").doc(user.uid).get();
      const data: any = doc.data();
      console.log(data);
      setUserData(data);
    };
    InitialUserData();
  }, [user.uid]);
  
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
    db.collection("users").doc(user.uid).update({
      avatarImage: user.photoUrl,
    });
  };
  const handleSubmit = async () => {
    const getUser = await db.collection("users").doc(user.uid).get();
    const data = getUser.data();
    const userParams = {
      userName: userName,
      profile: profile,
      lang: lang,
      userStatus: userStatus,
      gender: gender,
    };
    console.log(userParams);

    try {
      if (data) {
        await db
          .collection("users")
          .doc(user.uid)
          .update({
            ...userParams,
          });
      }
      if (!data) {
        await db
          .collection("users")
          .doc(user.uid)
          .set({
            ...userParams,
          });
      }
      doneSave();
    } catch (error) {
      undoneSave();
    }
    onClose();
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
            <p className="text-gray-700 font-bold">{user.displayName}</p>
            <br />
            {/* <p className="text-gray-700">
              {userData?.gender ? userData.gender : null}
            </p>
            <p className="text-gray-700">
              {
                (userData?.lang,
                userData?.userStatus
                  ? `${userData.lang}人と${userData.userStatus}`
                  : null)
              }
            </p> */}
          </div>
          <div className="flex-auto ">
            <PrimaryButton onClick={onOpen}>変更</PrimaryButton>
          </div>
        </div>
      </div>
      <div className="justify-center box-border my-4 mx-14">
        {/* <p className="text-gray-700">
          {userData.profile ? userData.profile : "プロフィールはまだありません"}
        </p> */}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロフィール編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="12" my="4">
            <AuthInput
              placeholder={"名前"}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              defaultValue={userData?.userName}
              type="text"
            />
            <AuthInput
              placeholder={"交際相手の国籍は？"}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              defaultValue={userData?.lang}
              type={"text"}
            />
            <RadioGroup onChange={setGender} value={gender} my="6">
              <Stack direction="row" spacing={8} mx="4">
                <Radio value={"🚹"}>男性</Radio>
                <Radio value={"🚺"}>女性</Radio>
                <Radio value={""}>未設定</Radio>
              </Stack>
            </RadioGroup>
            <RadioGroup onChange={setUserStatus} value={userStatus} my="6">
              <Stack direction="row" spacing={8} mx="4">
                <Radio value={"交際中"}>交際中</Radio>
                <Radio value={"既婚"}>既婚</Radio>
              </Stack>
            </RadioGroup>
            <Textarea
              placeholder="Here is a sample placeholder"
              mt="1.5rem"
              onChange={(e) => setProfile(e.target.value)}
              value={profile}
              defaultValue={userData?.profile}
              rows={5}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
