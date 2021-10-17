import React, { useState, VFC } from "react";
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
  Spinner,
  FormControl,
} from "@chakra-ui/react";
import { AuthInput } from "../../components/input/AuthInput";
import { useAlert } from "../../hooks/useAlert";
import { useForm } from "react-hook-form";
import firebase from "firebase";

export const Profile: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const username = user.displayName;
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [userData, setUserData] = useState<React.SetStateAction<any> | null>(
    null
  );

  const doneSave = useAlert("保存に成功しました", "success");
  const undoneSave = useAlert("保存に失敗しました", "error");
  const {
    handleSubmit,
    register,
    setValue,
    formState,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const InitialUserData = async () => {
      if (user.uid) {
        const doc = await db.collection("users").doc(user.uid).get();
        const data: any = doc.data();
        const fieldNames = Object.keys(data);
        fieldNames.map((fieldName) => {
          setValue(fieldName, data[fieldName]);
        });
        setUserData(data);
        if (data.avatar) {
          setAvatarImage(data.avatar);
        }
      }
    };
    InitialUserData();
  }, [setValue, user.uid]);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
    console.log(avatarImage);
  };

  const handleChangeSubmit = async (
    data: Partial<firebase.firestore.DocumentData>
  ) => {
    const authUser = auth.currentUser;
    try {
      if (avatarImage) {
        let url = "";
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
        console.log(url);
        
        await authUser?.updateProfile({ photoURL: url });
        dispatch(
          updateUserProfile({
            displayName: username,
            photoUrl: url,
          })
        );
        await db
          .collection("users")
          .doc(user.uid)
          .set(
            {
              ...data,
              avatarImage: url,
            },
            { merge: true }
          );
        setUserData(data);
      } else {
        await authUser?.updateProfile({ photoURL: "" });
        dispatch(
          updateUserProfile({
            displayName: username,
            photoUrl: "",
          })
        );
        await db
          .collection("users")
          .doc(user.uid)
          .set(
            {
              ...data,
            },
            { merge: true }
          );
        setUserData(data);
      }
      doneSave();
    } catch (error) {
      undoneSave();
    }
    onClose();
  };

  return (
    <>
      {!userData ? (
        <Spinner color="blue"/>
      ) : (
        <>
          <div className="mx-14 w-auto mt-2">
            <div className="flex w-full">
              <div>
                <label>
                  <input
                    type="file"
                    className="hidden"
                  />
                  <Image
                    src={avatarImage ? user.photoUrl : "/img/avatar.png"}
                    className="rounded-full text-center cursor-pointer"
                    width={90}
                    height={90}
                    alt="Avatar"
                  />
                </label>
              </div>
              <div className="mx-8 ">
                <p className="text-gray-700 font-extrabold text-xl">
                  {userData.userName}
                </p>
                <br />
                <p className="text-gray-700 text-lg">
                  {userData.gender ? userData.gender : null}
                </p>
                <p className="text-gray-700 text-lg">
                  {userData.userStatus
                    ? `${userData.lang}人と${userData.userStatus}`
                    : null}
                </p>
              </div>
              <div className="flex-auto">
                <PrimaryButton onClick={onOpen}>変更</PrimaryButton>
              </div>
            </div>
          </div>
          <div className="justify-center box-border my-4 mx-14">
            <p className="text-gray-700 text-lg" id="profile">
              {userData.profile
                ? userData.profile
                : "プロフィールはまだありません"}
            </p>
          </div>
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit(handleChangeSubmit)} noValidate>
                <ModalHeader>プロフィール編集</ModalHeader>
                <ModalCloseButton />
                <ModalBody mx="12" my="4">
                  <label>
                    <input
                      type="file"
                      onChange={onChangeImageHandler}
                      className="hidden"
                    />
                    <Image
                      src="/img/avatar.png"
                      className="rounded-full text-center cursor-pointer"
                      width={80}
                      height={80}
                      alt="Avatar"
                    />
                  </label>
                  <AuthInput
                    id="userName"
                    placeholder="名前"
                    type="text"
                    register={register("userName")}
                  />
                  <AuthInput
                    id="lang"
                    placeholder={"交際相手の国籍は？"}
                    type="text"
                    register={register("lang")}
                  />
                  <FormControl>
                    <div className="my-4 mx-4 space-x-3 text-gray-700 text-lg">
                      <input type="radio" {...register("gender")} value="🚹" />
                      <label>男性</label>
                      <input type="radio" {...register("gender")} value="🚺" />
                      <label>女性</label>
                      <input type="radio" {...register("gender")} value="" />
                      <label>未回答</label>
                    </div>
                  </FormControl>
                  <FormControl>
                    <div className="my-4 mx-4 space-x-3 text-gray-700 text-lg">
                      <input
                        type="radio"
                        {...register("userStatus")}
                        value="交際中"
                      />
                      <label>交際中</label>
                      <input
                        type="radio"
                        {...register("userStatus")}
                        value="既婚"
                      />
                      <label>既婚</label>
                    </div>
                  </FormControl>
                  <Textarea
                    fontSize="lg"
                    id="profile"
                    placeholder="プロフィール"
                    rows={5}
                    {...register("profile")}
                  />
                  <ModalFooter px="none">
                    <Button
                      p="5"
                      rounded="full"
                      colorScheme="orange"
                      variant="ghost"
                      mr={4}
                      onClick={onClose}
                    >
                      閉じる
                    </Button>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      px="7"
                      py="5"
                      rounded="full"
                      isLoading={formState.isSubmitting}
                    >
                      保存
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
