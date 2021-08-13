import { VFC } from "react";

export const LockIcon: VFC = () => {
  return (
    <div>
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-200 group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};
