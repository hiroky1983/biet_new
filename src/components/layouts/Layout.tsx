import { useRouter } from "next/dist/client/router";
import React, { ReactNode, VFC } from "react";
import { BrowserFooterMenu } from "./footer/BrowserFooterMenu";
import { MobileFooterMenu } from "./footer/MobileFooterMenu";

type PROPS = {
  children: ReactNode,
}

export const Layout: VFC <PROPS>= (props) => {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <div className="hidden lg:flex">
          <BrowserFooterMenu />
        </div>
        <div className="w-full">{props.children}</div>
      </div>
      <div className="block lg:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};
