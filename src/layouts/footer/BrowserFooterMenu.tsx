import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

import { FOOTERITEMS } from "./MobileFooterMenu";

const THIS_YEAR = new Date().getFullYear()

export const BrowserFooterMenu: VFC = () => {
  
  return (
    <>
      <div className="flex-col mx-8 sm:mx-14 h-auto">
        {FOOTERITEMS.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a>
                <div className="cursor-pointer box-border m-2 py-8 sm:m-auto text-blue-500 hover:text-blue-400">
                  {item.element}
                </div>
              </a>
            </Link>
          );
        })}
      <div><small className="text-gray-500" lang="en">&copy; {THIS_YEAR} hirocky1983 All Rights Reserved.</small></div>
      </div>
    </>
  );
};
