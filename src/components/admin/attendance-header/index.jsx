import React from "react";

const AttendanceHeader = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-4  text-[#fff] text-2xl  bg-[#5C92F7] rounded-full w-[45px] h-[45px] p-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <h1 className="text-[20px]">Attendance</h1>
      </div>
    </div>
  );
};

export default AttendanceHeader;
