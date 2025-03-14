import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "student_token",
    "admin_token",
  ]);
  const [roll_id, setRoll_id] = useState("");
  useEffect(() => {
    if (cookies?.student_token) {
      axios
        .post("https://attendance-backend-pu76.vercel.app/api/v1/profile", {
          student_token: cookies?.student_token,
        })
        .then((data) => {
          console.log(data);
          navigate("/profile", {
            state: {
              student: {
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
    }
    if (cookies.admin_token) {
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
    }
  }, []);
  const [password, setPassword] = useState("");
  const login = async () => {
    axios
      .post("https://attendance-backend-pu76.vercel.app/api/v1/login", {
        roll_id,
        password,
      })
      .then((data) => {
        if (data.status === 201) {
          toast.success(data.data.msg);
          navigate("/students", {
            state: {
              admin: {
                ...data.data.user,
                token: data.data.token,
              },
            },
          });
          setCookie("admin_token", data.data.token);
          return;
        }
        setCookie("student_token", data.data.token);
        toast.success(data.data.msg);
        navigate("/profile", {
          state: {
            student: {
              ...data.data.user,
              token: data.data.token,
            },
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  return (
    <div className="flex items-center justify-between relative">
      <div className="bg-[#8FABDF] w-1/2 h-screen"></div>
      <div
        className="left-64 flex items-center justify-center flex-col absolute w-[900px] h-[500px] bg-white rounded-xl"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.05)" }}
      >
        <h1 className="mb-6 text-2xl font-semibold">Attendance App</h1>
        <div className="relative mb-4 w-[300px]">
          <input
            type="roll_id"
            id="roll_id"
            placeholder="Roll Id"
            value={roll_id}
            name="roll_id"
            onChange={(e) => setRoll_id(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4 w-[300px]">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          onClick={login}
          className="text-white border-0 py-2 px-6 focus:outline-none rounded text-lg bg-[#5C92F7]"
        >
          Log In
        </button>
      </div>
      <div className="bg-white w-1/2 h-screen"></div>
    </div>
  );
};

export default Login;
