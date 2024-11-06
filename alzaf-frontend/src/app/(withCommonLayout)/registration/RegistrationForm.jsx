"use client";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";

import { toast } from "sonner";

import { signUpUser } from "@/components/FrontendComponent/action/authAction";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegistrationForm = () => {
  const ref = createRef();
  const [state, fromAction] = useFormState(signUpUser, null);

  useEffect(() => {
    if (state && state.success) {
      toast("successfully sign up");
      ref.current?.reset();
    }
  }, [state, ref]);
  return (
    <div className=" min-h-screen bg-gray-100 pt-20">
      <div className="w-full  bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <form className="grid grid-cols-2 justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold  mb-4">Welcome to Alzaf.com</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number or Email
              </label>
              <input
                type="text"
                placeholder="Phone or Email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-4 mb-4">
            <div className="text-right mt-4">
              <a
                href="#"
                className="text-orange-500 font-medium hover:underline"
              >
                Login
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  {/* Add other months */}
                </select>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Day</option>
                  <option>1</option>
                  <option>2</option>
                  {/* Add other days */}
                </select>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Year</option>
                  <option>2000</option>
                  <option>2001</option>
                  {/* Add other years */}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                I’d like to receive exclusive offers and promotions via SMS.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
            >
              Sign Up
            </button>

            <div className="my-4 text-center text-gray-500">Or</div>

            <div className="space-y-2">
              <button className="w-full py-2 flex items-center justify-center gap-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition">
                <FaFacebook className="text-2xl" />
                Sign Up with Facebook
              </button>

              <button className="w-full py-2 flex items-center justify-center gap-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition">
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
