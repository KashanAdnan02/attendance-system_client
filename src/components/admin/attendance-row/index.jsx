import React from "react";

const AttendanceRow = ({ item, index }) => {
  return (
    <tr key={index}>
      <td className="p-4">{item.roll_id}</td>
      <td className="p-4">
        <img
          src={item.picture}
          className="w-[40px] h-[40px] rounded-full"
          alt=""
        />
      </td>
      <td className="p-4">{item.name}</td>
      <td className="p-4">{item.checkin}</td>
      <td className="p-4">{item.checkout === "-----" ? "Haven't Checkout yet" : item.checkout}</td>
    </tr>
  );
};

export default AttendanceRow;
