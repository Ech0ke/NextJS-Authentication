import React from "react";

type popupProps = {
  show: boolean;
  email: string;
  handleClose(): void;
};

function Popup({ show, email, handleClose }: popupProps) {
  if (!show) return;
  return (
    <div
      id="popup-modal"
      data-modal-target="popup-modal"
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-screen backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-lg max-h-full">
        <div className="relative rounded-lg  bg-gray-900 shadow-slate-950 shadow-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-300">
              Your account has been created! Email verification link has been
              sent to <span className="underline text-orange-500">{email}</span>{" "}
              and will be valid for 24 hours.
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-0 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={handleClose}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
