import React, { useState } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with actual login logic (e.g., API call)
    if (loginDetails.email === "admin@example.com" && loginDetails.password === "password123") {
      console.log("Login successful!");
      setErrorMessage(""); // Clear error
      // Redirect or perform post-login actions here
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center text-white">
      <div className="bg-gray-900 p-6 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">Welcome back! Please login to continue.</p>

        {errorMessage && (
          <div className="bg-red-500 text-white text-sm p-2 mb-4 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
