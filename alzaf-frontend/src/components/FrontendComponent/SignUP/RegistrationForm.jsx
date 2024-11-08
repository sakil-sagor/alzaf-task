"use client";

import YearSelect from "@/utils/YearSelect";
import ActionSubmitButton from "@/utils/action/ActionSubmitButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { toast } from "sonner";

const RegistrationForm = () => {
  const router = useRouter();
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState(null);
  const [promotionSms, setPromotionSms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("custom");
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password did not match.");
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, include one uppercase letter, one digit, and one special character."
      );
      return;
    }

    const dateOfBirth = `${year}-${month}-${day}`;
    const data = { ...formData, dateOfBirth, promotionSms };

    try {
      setLoading(true);
      console.log(data);
      const response = await fetch(
        "https://alzaf-server.vercel.app/api/v1/users/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("Sign up successful");
        setTimeout(() => {
          router.push("/afterRegistration");
        }, 1000);
      } else {
        toast.error(result.message || "Sign up failed");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 md:pt-20">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <form
          className="grid grid-cols-1 md:grid-cols-2 justify-between gap-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Welcome to Alzaf.com</h2>
              <div>
                <Link
                  href="/login"
                  className="text-orange-500 font-bold text-xl hover:underline md:hidden"
                >
                  Login
                </Link>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                required
                type="text"
                placeholder="Full name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="name"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number or Email
              </label>
              <input
                required
                type="text"
                placeholder="Phone or Email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="email"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Please enter your password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="password"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                required
                type="password"
                placeholder="Confirm password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-4 mb-4">
            <div className="text-right mt-4 hidden md:block">
              <Link
                href="/login"
                className="text-orange-500 font-medium hover:underline"
              >
                Login
              </Link>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  required
                  onChange={(e) => setMonth(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <YearSelect functinName={setDay} value="Day" low={1} top={31} />
                <YearSelect
                  functinName={setYear}
                  value="Year"
                  low={1950}
                  top={2024}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                onChange={(e) => setPromotionSms(!promotionSms)}
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                I’d like to receive exclusive offers and promotions via SMS.
              </label>
            </div>

            <ActionSubmitButton>Sign Up</ActionSubmitButton>

            <div className="my-4 text-center text-gray-500">Or</div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                }
                className="w-full py-2 flex items-center justify-center gap-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
              >
                <FaGithub className="text-2xl" />
                Sign Up with Github
              </button>

              <button
                type="button"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                }
                className="w-full py-2 flex items-center justify-center gap-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
              >
                <FcGoogle className="text-2xl" />
                Sign Up with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
