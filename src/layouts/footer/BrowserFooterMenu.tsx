import React, { VFC } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

import { FOOTERITEMS } from "./MobileFooterMenu";

const THIS_YEAR = new Date().getFullYear()

export const BrowserFooterMenu: VFC = () => {
  
  return (
    <>
      <div className="flex-col mx-8 sm:mx-16">
        {FOOTERITEMS.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a>
                <div className="space-y-3 cursor-pointer box-border m-2 py-4 sm:m-auto text-blue-500 hover:text-blue-400">
                  {item.element}
                </div>
              </a>
            </Link>
          );
        })}
      </div>

    </>
  );
};
