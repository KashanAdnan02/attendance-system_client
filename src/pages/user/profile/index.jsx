import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

const profile = () => {
  const { state } = useLocation();
  const [attendance, setAttendance] = useState(false);
  const [AttendanceId, setId] = useState("");
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["student_token"]);
  const getData = () => {
    axios
      .post("https://attendance-backend-pu76.vercel.app/api/v1/profile", {
        student_token: cookies.student_token,
      })
      .then((data) => {
        setProfile(data.data.User);
      })
      .catch((err) => {
        removeCookie("student_token");
        navigate("/", { state: {} });
      });
  };
  React.useEffect(() => {
    getData();
    if (state?.student?.role === "student" && cookies.student_token) {
    } else {
      navigate("/");
    }
  }, [state, profile]);
  const [upload, setUpload] = useState(false);
  const [picture, setPicture] = useState("nothing");
  const logout = () => {
    removeCookie("student_token");
    navigate("/", { state: {} });
  };
  const check_in = async () => {
    console.log(picture);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ longitude, latitude });
      console.log(location);

    });
    if (upload === false || picture === "nothing") {
      setUpload(true);
    } else {
      setUpload(false);
      const formdata = new FormData();
      formdata.append("image", picture);
      formdata.append("location", location);
      formdata.append("name", profile?.name);
      formdata.append("roll_id", profile?.roll_id);
      console.log(formdata);

      const checkin = await axios.post(
        "https://attendance-backend-pu76.vercel.app/api/v1/checkin",
        formdata
      );
      setId(checkin.data.User._id);
      toast.success("Congratulations! " + checkin.data.message);
      setAttendance(true);
      setTimeout(() => {
        setAttendance(false);
      }, 1000000000);
    }
  };
  const check_out = async () => {
    const checkin = await axios.post("https://attendance-backend-pu76.vercel.app/api/v1/checkout", {
      roll_id: profile?.roll_id,
      id: AttendanceId,
    });
    toast.success("Checkout Succesfully!");
    setAttendance(false);
  };
  return (
    <>
      <div className="flex w-full flex-col p-10 relative overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <img
            src={profile?.picture}
            className="object-cover w-14 h-14 rounded-full"
            alt=""
          />
          <div className="flex items-center justify-center">
            <h1 className="px-4 py-3 rounded-lg ">{profile?.name}</h1>

            <button
              onClick={logout}
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-[#5C92F7]"
            >
              <span className="text-white">Logout</span>
            </button>
          </div>
        </div>
        <div className="mt-10">
          {" "}
          <p className="text-gray-500 my-4 text-lg">Id</p>
          <p className="font-semibold">{profile?.roll_id}</p>
          <p className="text-gray-500 my-4 text-lg">Course</p>
          <p className="font-semibold">{profile?.course_name}</p>
          <p className="text-gray-500 my-4 text-lg">Check In</p>
          <p className="font-semibold">{profile?.check_in}</p>
          <p className="text-gray-500 my-4 text-lg">Check Out</p>
          <p className="font-semibold">{profile?.check_out}</p>
          <button
            onDoubleClick={() => setUpload(false)}
            onClick={attendance === true ? check_out : check_in}
            className="flex mt-4 items-center justify-center px-4 py-3 rounded-lg bg-[#5C92F7]"
          >
            <span className="text-white ml-2">
              {attendance === true ? "Check Out" : "Check In"}
            </span>
          </button>
        </div>
        <div
          className={`bg-white p-10 absolute ${upload ? " top-0" : "top-[-240px]"
            } transition-all duration-700 w-60 h-60 left-[40%]`}
        >
          <div className="flex items-center justify-center flex-col">
            <label
              htmlFor="file"
              className="cursor-pointer bg-[#5C92F7] relative flex items-center justify-center flex-col rounded-full w-40 h-40 "
            >
              <p className="text-white text-center">
                {" "}
                Click Here to Choose File
              </p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
