import React, { createRef, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { StudentsRow, StudentThead } from "../../../components";
import toast from "react-hot-toast";

const Student = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["admin_token"]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [roll_id, setRoll_id] = useState("");
  const [password, setPassword] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [picture, setPicture] = useState("");
  const inputRef = createRef();
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    if (state?.admin?.role === "admin" && cookies?.admin_token) {
      getStudents();
    } else {
      navigate("/");
    }
  }, [state]);
  const getStudents = async () => {
    const data = axios
      .get("https://attendance-backend-pu76.vercel.app/api/v1/students")
      .then((data) => {
        setStudents(data.data);
      })
      .catch((err) => {
        removeCookie("admin_token");
        navigate("/", { state: {} });
      });
  };

  const createStudent = async () => {
    const formdata = new FormData();
    formdata.append("image", picture);
    formdata.append("name", first_name + " " + last_name);
    formdata.append("roll_id", roll_id);
    formdata.append("password", password);
    formdata.append("course_name", course_name);
    const data = axios
      .post("https://attendance-backend-pu76.vercel.app/api/v1/register", formdata)
      .then((data) => {
        toast.success("Student Created Succesfully !");
        setSidebar(false);
        getStudents();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  return (
    <>
      <div className="bg-[#F8F8F8] flex items-center justify-between w-[100%] overflow-hidden relative">
        <Sidebar />
        <div className="flex w-full h-screen p-10 flex-col">
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
              <h1 className="text-[20px]">Students</h1>
            </div>
            <button
              onClick={() => setSidebar(true)}
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-[#5C92F7]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white ml-2">Add Student</span>
            </button>
          </div>
          <table className="mt-8 ">
            <StudentThead />
            <StudentsRow
              students={students}
              setStudents={setStudents}
              getStudents={getStudents}
            />
          </table>
        </div>

        <div
          className={`absolute duration-1000  ${sidebar ? "right-0" : "right-[-570px]"
            }`}
        >
          <div className="bg-white w-[570px]  h-screen flex-col flex items-start justify-around shadow-xl pt-10 pb-10">
            <div className="w-full flex justify-between items-center pr-6">
              <h1 className="flex items-center ml-4 font-semibold text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  class="w-6 h-6 mr-4 cursor-pointer"
                  onClick={() => setSidebar(false)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Add Student
              </h1>
              <button
                onClick={createStudent}
                className="cursor-pointer ml-4 bg-[#5C92F7] py-2 px-4 w-[100px] rounded-lg text-white mt-2"
              >
                Add
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer bg-[#5C92F7] relative rounded-full  w-40 h-40 my-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  data-slot="icon"
                  class="w-10 h-10 p-2 rounded-full bg-[#D9D9D9] absolute right-0 bottom-0 "
                >
                  <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                  <path
                    fill-rule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
              <input
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
                id="file"
                className="hidden"
              />
              <div className="w-full flex items-center flex-wrap">
                <div className="relative m-4 w-[250px]">
                  <label
                    htmlFor=""
                    className="leading-7 text-sm text-black font-medium mb-4"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFirst_Name(e.target.value)}
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative m-4 w-[250px]">
                  <label
                    htmlFor=""
                    className="leading-7 text-sm text-black font-medium mb-4"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setLast_Name(e.target.value)}
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative m-4 w-[250px]">
                  <label
                    htmlFor=""
                    className="leading-7 text-sm text-black font-medium mb-4"
                  >
                    Course
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCourse_Name(e.target.value)}
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative m-4 w-[250px]">
                  <label
                    htmlFor=""
                    className="leading-7 text-sm text-black font-medium mb-4"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative m-4 w-[250px]">
                  <label
                    htmlFor=""
                    className="leading-7 text-sm text-black font-medium mb-4"
                  >
                    Roll Id
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setRoll_id(e.target.value)}
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
