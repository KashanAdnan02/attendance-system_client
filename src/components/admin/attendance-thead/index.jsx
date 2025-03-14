import React from "react";

const AttendanceThead = () => {
  return (
    <thead className="w-full bg-[#5C92F7] p-4 text-white rounded-lg">
      <tr>
        <td className="p-4" style={{ borderRadius: "10px 0px 0px 0px" }}>
          id
        </td>
        <td className="p-4">Profile Img</td>
        <td className="p-4">Name</td>
        <td className="p-4">Check In Time</td>
        <td className="p-4" style={{ borderRadius: "0px 10px 0px 0px" }}>
          Check Out Time
        </td>
      </tr>
    </thead>
  );
};

export default AttendanceThead;
