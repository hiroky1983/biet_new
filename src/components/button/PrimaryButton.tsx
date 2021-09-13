import React, { ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/button";
import { buttonStyles } from "../../utils/buttonStyles";
import { background } from "@chakra-ui/styled-system";

type Props = {
  children?: ReactNode;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <div className="items-center justify-center text-center ">
      <Button
        colorScheme="blue"
        width={"20"}
        rounded="full"
        _hover={{ background: "lightBlue" }}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};
