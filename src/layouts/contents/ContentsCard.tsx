import React from "react";
import type { VFC } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";

export const ContentsCard: VFC = () => {
  return (
    <div className="flex justify-center hover:translate-x-1">
      <div className="bg-white shadow-lg p-4 rounded-2xl w-60 cursor-pointer ">
        <div className="text-center mt-4">
          <p className="text-gray-600 font-bold">Name</p>
        </div>
        <div className="flex justify-center mt-4">
          <Image
            className="shadow rounded-full"
            src="/img/avatar.png"
            alt="Avatar"
            width={70}
            height={70}
          />
        </div>
        <div className="mt-6 flex justify-between text-center">
          <div>
            <p className="text-gray-700 font-bold">20</p>
            <p className="text-xs mt-2 text-gray-600 font-hairline">Posts</p>
          </div>
          <div>
            <p className="text-gray-700 font-bold">99k</p>
            <p className="text-xs mt-2 text-gray-600 font-hairline">Likes</p>
          </div>
          <div>
            <p className="text-gray-700 font-bold">530</p>
            <p className="text-xs mt-2 text-gray-700 font-hairline">Shares</p>
          </div>
        </div>
      </div>
    </div>
  );
};
