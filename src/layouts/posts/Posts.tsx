import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { Textarea } from "@chakra-ui/textarea";
import React, { VFC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle } from "react-icons/ai";
import { ImEarth } from "react-icons/im";
import { FaQuora, FaTag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import { login, selectUser } from "../../lib/auth";
import { Center, Flex, Spacer } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export const Posts: VFC = () => {
  const [userData, setUserData] =
    React.useState<React.SetStateAction<any> | null>(null);
  const user = useSelector(selectUser);
  const { handleSubmit, register, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const initialData = async () => {
      const doc = await db.collection("users").doc(user.uid).get();
      const data: any = doc.data();
      const fieldNames = Object.keys(data);
      fieldNames.map((fieldName) => {
        setValue(fieldName, data[fieldName]);
      });
      setUserData(data);
    };
    initialData();
  }, []);

  return (
    <div className="w-full h-5/6 bg-white p-16 ">
      <div className="items-center flex ">
        <AiFillQuestionCircle className="text-blue-500 text-3xl mr-6" />
        <Input
          p="2"
          placeholder="質問の件名"
          w="70%"
          variant="flushed"
          fontSize="lg"
          textColor="gray.700"
        />
      </div>
      {userData ? (
        <div className="flex item-center my-10">
          <ImEarth className=" text-3xl mr-6 text-blue-500" />
          <Input
            p="2"
            readOnly
            border="none"
            fontSize="lg"
            defaultValue={userData && userData.lang}
            textColor="gray.600"
          />
        </div>
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
      <div className="flex item-center my-10">
        <FaQuora className="text-blue-500 text-3xl mr-6" />
        <Textarea placeholder="質問内容" rows={14} resize="none" fontSize="lg"/>
      </div>
      <Flex>
        <FaTag className="text-blue-500 text-3xl mr-6" />

        <Spacer />
        <Button
          type="submit"
          variantColor="blue"
          isLoading={formState.isSubmitting}
          bg="#3C82F6"
          color="white"
          borderRadius="xl"
        >
          +
        </Button>
      </Flex>
    </div>
  );
};
