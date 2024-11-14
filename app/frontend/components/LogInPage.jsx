import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors([]);
    setSuccessMessage("");

    // Simple validation
    if (!email || !password) {
      setErrors(["Email and password are required"]);
      return;
    }

    // Submit the login form (mock API request)
    try {
      // Replace with actual login logic/API call
      // e.g., const response = await api.login({ email, password });
      // if (response.success) {
      setSuccessMessage("Successfully logged in!");
      setEmail("");
      setPassword("");
      // }
    } catch (error) {
      setErrors(["Login failed. Please try again."]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Log In
        </h2>

        {/* Success message */}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        {/* Error messages */}
        {errors.length > 0 && (
          <div className="text-red-600 text-center mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/forgot-password"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Forgot your password?
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
