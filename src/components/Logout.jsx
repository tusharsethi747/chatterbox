import React from "react";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate(`/login`);
  };
  return (
    <button className=" hover: text-fuchsia-900" onClick={handleClick}>
      <FaPowerOff />
    </button>
  );
};

export default Logout;
