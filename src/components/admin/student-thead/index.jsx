import React from "react";

const StudentThead = () => {
  return (
    <thead className="w-full bg-[#5C92F7] p-4 mb-4 text-white rounded-lg">
      <tr>
        <td className="p-4" style={{ borderRadius: "10px 0px 0px 0px" }}>
          id
        </td>
        <td className="p-4">Profile Img</td>
        <td className="p-4">Name</td>
        <td className="p-4">Course Name</td>
        <td className="p-4" style={{ borderRadius: "0px 10px 0px 0px" }}>
          Actions
        </td>
      </tr>
    </thead>
  );
};

export default StudentThead;
