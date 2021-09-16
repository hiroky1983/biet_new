import { Button } from "@chakra-ui/button";
import React, { ReactNode, VFC } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const SecondaryButton: VFC<Props> = (props) => {
  const { children, onClick } = props;

  return (
    <div className="text-center ">
      <Button
        onClick={onClick}
        colorScheme="blackAlpha"
        textColor="white"
        px="6"
        py="8"
      >
        {children}
      </Button>
    </div>
  );
};
