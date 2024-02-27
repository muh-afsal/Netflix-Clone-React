import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormsubmisson = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.message.split(/:(.+)/)[1].split(".")[0].trim());
    }
  };

  return (
    <>
      <div className="w-full h-screen ">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 rounded text-white">
            <div className="max-w-[320px] mx-auto py-20">
              <h1 className="text-3xl font-bold">Sign In</h1>
              {err ? <p className="text-red-500 py-3">{err}</p> : null}
              <form
                onSubmit={handleFormsubmisson}
                className="w-full flex flex-col p-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-3 bg-gray-500/30 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-3 bg-gray-500/30 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="bg-red-600 py-2 my-6 rounded font-bold">
                  Sign In
                </button>
                <div className="flex justify-between text-gray-600 text:sm ">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="text-sm py-6 text-gray-600">
                  New to Netflix?{" "}
                  <span className="text-white">
                    <Link to="/signup">Sign Up</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
