import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const name = useParams();
  const navigate = useNavigate();
  const [studentSidebar, setStudentSidebar] = useState(false);
  const [attendanceSidebar, setAttendanceSidebar] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["admin_token"]);
  const goToStudents = () => {
    axios
      .post("https://attendance-backend-pu76.vercel.app/api/v1/profile", {
        student_token: cookies.admin_token,
      })
      .then((data) => {
        navigate("/students", {
          state: {
            admin: {
              ...data.data.User,
              token: data.data.token,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  const goToAttendance = () => {
    axios
      .post("https://attendance-backend-pu76.vercel.app/api/v1/profile", {
        student_token: cookies.admin_token,
      })
      .then((data) => {
        navigate("/attendances", {
          state: {
            admin: {
              ...data.data.User,
              token: data.data.token,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  const logout = () => {
    removeCookie("admin_token");
    navigate("/", { state: {} });
  };
  useEffect(() => {
    if (window.location.pathname === "/students") {
      setStudentSidebar(true);
    }
    if (window.location.pathname === "/attendances") {
      setAttendanceSidebar(true);
    }
  }, [window.location.pathname]);
  console.log(studentSidebar);
  return (
    <div className="h-screen w-[320px] bg-white flex items-start flex-col justify-start py-8 pr-2">
      <h1 className="mx-auto text-xl font-medium">Attendance App</h1>
      <div className="ml-4 mt-6 w-full flex justify-between flex-col items-start h-screen">
        <div>
          <button
            onClick={goToStudents}
            className={`hover:bg-[#5c92f71b] rounded-lg pl-2 flex items-center w-[260px] h-[60px] ${
              studentSidebar ? "bg-[#5c92f71b]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-slot="icon"
              className="mr-4  text-[#5C92F7]  bg-[#F8F8F8] rounded-full w-[40px] h-[40px] p-2"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>
            Students
          </button>
          <button
            onClick={goToAttendance}
            className={`hover:bg-[#5c92f71b] rounded-lg pl-2 flex items-center w-[260px] mt-2 h-[60px]  ${
              attendanceSidebar ? "bg-[#5c92f71b]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-slot="icon"
              className="mr-4  text-[#5C92F7]  bg-[#F8F8F8] rounded-full w-[40px] h-[40px] p-2"
            >
              <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
            </svg>
            Attendances
          </button>
        </div>
        <button
          onClick={logout}
          className="bg-[#5C92F7] p-2 text-white w-[200px] rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
