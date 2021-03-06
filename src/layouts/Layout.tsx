import React, { ReactNode } from "react";
import type { VFC } from "react";
import { useRouter } from "next/router";

import { BrowserFooterMenu } from "./footer/BrowserFooterMenu";
import { MobileFooterMenu } from "./footer/MobileFooterMenu";
import { Header } from "./header/Header";
import { SubHeader } from "./header/SubHeader";

type Props = {
  children: ReactNode;
  title: string;
};

export const Layout: VFC<Props> = (props) => {
  const router = useRouter();
  return (
    <div className="h-screen">
      {router.pathname === "/" ? <Header /> : <SubHeader title={props.title} />}
      <div className="flex">
        <div className="hidden lg:flex">
          <BrowserFooterMenu />
        </div>
        <div className="w-full h-auto">{props.children}</div>
      </div>
      <div className="block lg:hidden">
        <MobileFooterMenu />
      </div>
    </div>
  );
};
