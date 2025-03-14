import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StudentsRow = ({ students, setStudents, getStudents }) => {
  const deleteStudent = async (id) => {
    axios
      .delete("https://attendance-backend-pu76.vercel.app/api/v1/student/" + id)
      .then((res) => {
        toast.success("Student Deleted SuccessFully !");
        getStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rollId, setRollId] = useState([]);
  const [picture, setPicture] = useState([]);
  const [name, setName] = useState([]);
  const [coure, setCourse] = useState([]);

  const updateStudent = async (id, index) => {
    if (picture) {
      const formdata = new FormData();
      formdata.append("image", picture);
      formdata.append("name", name);
      formdata.append("course_name", coure);
      formdata.append("roll_id", rollId);
      axios
        .put("https://attendance-backend-pu76.vercel.app/api/v1/student/" + id, formdata)
        .then((res) => {
          toast.success("Student Updated SuccessFully !");
          getStudents();
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios
      .put("https://attendance-backend-pu76.vercel.app/api/v1/student/" + id, {
        roll_id: rollId,
        picture,
        course_name: coure,
        name,
      })
      .then((res) => {
        toast.success("Student Updated SuccessFully !");
        getStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tbody className="w-full bg-white p-4 rounded-lg">
      {students.map((item, index) => {
        return (
          <tr key={index}>
            <td className="p-4">
              {item.isEdit ? (
                <div className="relative w-[150px]">
                  <input
                    type="number"
                    onChange={(e) => setRollId(e.target.value)}
                    placeholder="Enter Roll Id"
                    value={rollId}
                    name="roll_id"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              ) : (
                item.roll_id
              )}
            </td>
            <td className="p-4">
              {item.isEdit ? (
                <div className="relative w-[190px]">
                  <label
                    htmlFor="imagekiese"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3  cursor-pointer px-3 leading-8 transition-colors duration-200 ease-in-out "
                  >
                    Select Image
                  </label>
                  <input
                    type="file"
                    id="imagekiese"
                    onChange={(e) => setPicture(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <img
                  src={item.picture}
                  className="object-cover w-[40px] h-[40px] rounded-full"
                  alt={item.name}
                />
              )}
            </td>
            <td className="p-4">
              {item.isEdit ? (
                <div className="relative w-[190px]">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    value={name}
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              ) : (
                item.name
              )}
            </td>
            <td className="p-4">
              {" "}
              {item.isEdit ? (
                <div className="relative w-[190px]">
                  <input
                    type="text"
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="Enter Course"
                    value={coure}
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              ) : (
                item.course_name
              )}
            </td>
            {item.isEdit == true ? (
              <td className="p-4">
                <button
                  className="bg-[#5C92F7] py-2 px-3 text-white rounded-lg"
                  onClick={() => updateStudent(item._id, index)}
                >
                  Update
                </button>
              </td>
            ) : (
              <td className="p-4">
                <button
                  onClick={() => {
                    students[index].isEdit = true;
                    setStudents([...students]);
                    setCourse(item.course_name);
                    setName(item.name);
                    setRollId(item.roll_id);
                    setPicture(item.picture);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mx-2 "
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    deleteStudent(item._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-800"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default StudentsRow;
