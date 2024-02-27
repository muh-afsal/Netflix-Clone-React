// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigagte = useNavigate();

  const handlelogout = async () => {
    try {
      await logOut();
      navigagte("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 z-[100] absolute w-full">
      <Link to="/">
        <img
          className="w-[150px] lg:w-[200px] "
          src="/src/assets/Screenshot_2024-02-26_101840-removebg-preview.png"
          alt=""
        />
      </Link>

      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white font-semibold   sm:text-sm md:text-base  pr-3 cursor-pointer">
              Account
            </button>
          </Link>

          <button
            onClick={handlelogout}
            className="bg-red-600 rounded px-2 py-1 sm:text-sm md:text-base  font-semibold text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white font-semibold   sm:text-sm md:text-base  pr-3 cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 rounded px-2 py-1 sm:text-sm md:text-base  font-semibold text-white cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
