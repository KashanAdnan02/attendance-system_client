import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import axios from "axios";
import {
  AttendanceRow,
  AttendanceThead,
  AttendanceHeader,
} from "../../../components";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["admin_token"]);
  const { state } = useLocation();
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    const data = await axios.get("https://attendance-backend-pu76.vercel.app/api/v1/attendances");
    setAttendance(data.data);
  };
  useEffect(() => {
    if (state?.admin?.role === "admin" && cookies?.admin_token) {
      getAttendance();
    } else {
      navigate("/");
    }
  }, [state, attendance]);
  return (
    <div className="bg-[#F8F8F8] flex items-center justify-between w-full">
      <Sidebar />
      <div className="flex w-full h-screen overflow-y-scroll p-10 flex-col">
        <AttendanceHeader />
        <table className="mt-8">
          <AttendanceThead />
          <tbody className="w-full bg-white p-4 rounded-lg">
            {attendance.map((item, index) => {
              return <AttendanceRow item={item} index={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
