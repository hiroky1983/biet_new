/* eslint-disable jsx-a11y/alt-text */
import { Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React, { useEffect, useState, VFC } from "react";

export const PostCard: VFC = () => {
  return (
    <div>
      <div className="bg-white w-full p-6 my-1 rounded-md shadow-lg cursor-pointer hover:">
        <Flex alignItems="center">
          <Image src="https://picsum.photos/id/180/90/90" rounded="full" mr="8"/>
          <Heading>Card for Question</Heading>
        </Flex>
        <Flex>
          <Spacer />
          <Text>2021-08-18</Text>
        </Flex>
      </div>
    </div>
  );
};
