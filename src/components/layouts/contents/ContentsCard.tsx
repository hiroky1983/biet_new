import React, { FC } from "react";
import "tailwindcss/tailwind.css";
import Image from "next/image";

export const ContentsCard: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg p-4 rounded-2xl w-60">
        <div className="text-center mt-4">
          <p className="text-gray-600 font-bold">Name</p>
          <p className="text-sm font-hairline text-gray-600 mt-1">Subtitle</p>
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
