import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user in the stored users list
    const foundUser = storedUsers.find(
      (user) => user.email === credentials.email && user.password === credentials.password
    );

    if (!foundUser) {
      setError("Invalid email or password!");
      return;
    }

    // Store authenticated user info
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); 

    // Redirect based on role
    if (foundUser.role === "admin") {
      navigate("/members"); // Admin goes to Members page
    } else {
      navigate("/"); // Regular users go to Dashboard
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        {/* Left Side Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img className="w-full h-full object-cover" src="/signin.avif" alt="Sign In" />
        </div>

        {/* Right Side Form */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          {/* Logo */}
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600">Welcome back!</p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Email Input */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          {/* Sign In Button */}
          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300"
            >
              Sign In
            </button>
          </div>

          {/* Navigation to Sign Up */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <p className="text-xs text-gray-500 uppercase hover:underline">
              <a href="/signup">or sign up</a>
            </p>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
