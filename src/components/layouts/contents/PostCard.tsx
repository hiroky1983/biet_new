import React, { VFC } from "react";
// import "tailwindcss/tailwind.css";

export const PostCard: VFC = () => {
  return (
<div className="p-8">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex">
      <div>
        <div className="w-10 h-10 bg-cover bg-center rounded-full mr-3 shadow-inner">
        </div>
      </div>
      <div>
        <p className="text-gray-600 font-medium">Jack Cooper</p>
        <div className="flex items-center text-xs text-gray-600">
          <p>3 hours ago</p>
          <p className="px-1">•</p>
          <p>The frontier</p>
        </div>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-gray-600 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        cursus ornare nibh, sit amet interdum lorem suscipit at. Ut cursus
        condimentum neque vel gravida.
      </p>
    </div>
    <div className="mt-6 flex">
      <button className="flex items-center hover:opacity-75 mr-4">
        <i className="mr-2">
          <svg
            className="fill-current text-blue-500 w-6 h-6"
            height="512"
            viewBox="0 0 16 16"
            width="512"
          >
            <path
              d="M0 6v8a1 1 0 001 1h3V5H1a1 1 0 00-1 1zM14.153 6H11.2a.491.491 0 01-.43-.247.492.492 0 01-.007-.496l1.041-1.875c.229-.411.252-.894.065-1.325a1.488 1.488 0 00-1.013-.858l-.734-.184a.499.499 0 00-.493.15l-3.987 4.43A2.499 2.499 0 005 7.267V12.5C5 13.878 6.122 15 7.5 15h4.974a2.506 2.506 0 002.411-1.84l1.068-4.898A1.849 1.849 0 0014.153 6z"
            />
          </svg>
        </i>
        <p className="mt-1 text-blue-500">Like</p>
      </button>
      <button className="flex items-center hover:opacity-75">
        <i className="mr-2">
          <svg
            className="fill-current text-blue-500 w-6 h-6"
            height="512"
            viewBox="0 0 511.072 511.072"
            width="512"
          >
            <path
              d="M74.39 480.536H38.177l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425C-2.04 277.611-3.811 238.37 6.932 199.776c12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z"
            />
          </svg>
        </i>
        <p className="mt-1 text-blue-500">64 Comments</p>
      </button>
    </div>
    <div className="mt-6 border-gray-100 border-t pt-4 flex justify-between">
      <input placeholder="Add comment" className="placeholder-gray-300 text-gray-700 focus:outline-none" type="text"/>
      <div className="flex">
        <button className="mr-2 hover:opacity-75">
          <i>
            <svg
              className="fill-current text-gray-300 w-6 h-6"
              height="512pt"
              viewBox="-96 0 512 512"
              width="512pt"
            >
              <path
                d="M160 512C71.766 512 0 440.234 0 352V128c0-11.797 9.559-21.332 21.332-21.332 11.777 0 21.336 9.535 21.336 21.332v224c0 64.684 52.629 117.332 117.332 117.332S277.332 416.684 277.332 352V117.332c0-41.172-33.492-74.664-74.664-74.664-41.176 0-74.668 33.492-74.668 74.664v213.336c0 17.64 14.355 32 32 32s32-14.36 32-32V128c0-11.797 9.559-21.332 21.332-21.332 11.777 0 21.336 9.535 21.336 21.332v202.668c0 41.172-33.496 74.664-74.668 74.664s-74.668-33.492-74.668-74.664V117.332C85.332 52.652 137.961 0 202.668 0 267.371 0 320 52.652 320 117.332V352c0 88.234-71.766 160-160 160zm0 0"
              />
            </svg>
          </i>
        </button>
        <button className="hover:opacity-75">
          <i>
            <svg
              className="fill-current text-gray-300 w-6 h-6"
              viewBox="0 0 477.867 477.867"
            >
              <path
                d="M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm0 443.733c-113.108 0-204.8-91.692-204.8-204.8s91.692-204.8 204.8-204.8 204.8 91.692 204.8 204.8c-.122 113.058-91.742 204.678-204.8 204.8z"
              />
              <circle cx="153.6" cy="204.8" r="34.133" />
              <circle cx="324.267" cy="204.8" r="34.133" />
              <path
                d="M304.287 296.61c-5.637-7.554-16.331-9.108-23.885-3.47a17.07 17.07 0 00-.953.766c-24.135 17.628-56.898 17.628-81.033 0-7.131-6.164-17.909-5.379-24.072 1.752-6.164 7.131-5.379 17.909 1.752 24.072.308.267.626.522.953.766 36.531 27.922 87.236 27.922 123.767 0 7.555-5.638 9.109-16.332 3.471-23.886z"
              />
            </svg>
          </i>
        </button>
      </div>
    </div>
  </div>
</div>
)
}