import React, { VFC } from "react";
import { Button } from "@chakra-ui/button";
import { LockIcon } from "../svg/LockIcon";
import { on } from "events";

type Props = {
  title?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  spinner: any;
  disabled?: boolean;
  onClick?: () => void;
};

export const CreateButton: VFC<Props> = (props) => {
  const { children, isLoading, spinner,disabled,onClick } = props;
  return (
    <div className="items-center">
      <Button
      onClick={onClick}
        disabled={disabled}
        colorScheme="blue"
        width="40"
        isLoading={isLoading}
        spinner={spinner}
      >
        {children}
      </Button>
    </div>
  );
};
