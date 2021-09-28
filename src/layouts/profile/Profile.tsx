import React, { useCallback, useState, VFC } from "react";
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
import { useForm } from "react-hook-form";

export const Profile: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const username = user.displayName;
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [userData, setUserData] = useState<React.SetStateAction<any> | null>(
    null
  );
  const [gender, setGender] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState("");
  const [profile, setProfile] = useState("");
  const doneSave = useAlert("認証に成功しました", "success");
  const undoneSave = useAlert("保存に失敗しました", "error");
  const {
    handleSubmit,
    register,
    formState,
    reset,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleChangeInputData = useCallback((property, value, setValue) => {
    setUserData((p: any) => {
      return {
        ...p,
        [property]: value,
        setValue: setValue(value),
      };
    });
  }, []);

  useEffect(() => {
    const InitialUserData = async () => {
      if (user.uid) {
        const doc = await db.collection("users").doc(user.uid).get();
        const data: any = doc.data();
        const fieldNames = Object.keys(data);
        fieldNames.map((fieldName) => {
          setValue(fieldName, data[fieldName]);
        });
      }
    };
    InitialUserData();
  }, [setValue, user.uid]);

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
  const handleChangeSubmit = async () => {
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
          .set(
            {
              ...userParams,
            },
            { merge: true }
          );
      }
      doneSave();
    } catch (error) {
      undoneSave();
    }
    onClose();
  };
  // console.log(gender);
  // console.log(lang);
  // console.log(profile);
  // console.log(userStatus);
  // console.log(userName);
  console.log(userName);
  

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
            <p className="text-gray-700 font-bold">{userName}</p>
            <br />
            <p className="text-gray-700">{gender ? gender : null}</p>
            <p className="text-gray-700">
              {userStatus ? `${lang}人と${userStatus}` : null}
            </p>
          </div>
          <div className="flex-auto ">
            <PrimaryButton onClick={onOpen}>変更</PrimaryButton>
          </div>
        </div>
      </div>
      <div className="justify-center box-border my-4 mx-14">
        <p className="text-gray-700">
          {profile ? profile : "プロフィールはまだありません"}
        </p>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleChangeSubmit)}>
            <ModalHeader>プロフィール編集</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx="12" my="4">
              {/* <InputTextForm
                    id="partner_address2"
                    label="番地"
                    isInvalid={isDeliveriesData && errors?.partner_address2}
                    register={register("partner_address2", {
                      required: isDeliveriesData && REQUIRE_MSG,
                    })}
                    {...(isDeliveriesData && { isRequired: true })}
                  /> */}
              <AuthInput
                id="userName"
                placeholder="名前"
                type="text"
                register={register("userName", {
                  required: true,
                })}
              />
              <AuthInput
                id="lang"
                placeholder={"交際相手の国籍は？"}
                type="text"
                register={register("lang", {
                  required: true,
                })}
              />
              <RadioGroup id="gender" options={["🚹", "🚺", ""]}>
                <Stack direction="row" spacing={8} mx="4">
                  <Radio value={"🚹"}>男性</Radio>
                  <Radio value={"🚺"}>女性</Radio>
                  <Radio value={""}>未設定</Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup id="userStatus" options={["交際中", "既婚"]}>
                <Stack direction="row" spacing={8} mx="4">
                  <Radio value="交際中">交際中</Radio>
                  <Radio value="既婚">既婚</Radio>
                </Stack>
              </RadioGroup>
              <Textarea
                id="profile"
                placeholder="プロフィール"
                rows={5}
                register={register("profile", {
                  required: true,
                })}
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
              <Button colorScheme="blue" type="submit">
                Secondary Action
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
