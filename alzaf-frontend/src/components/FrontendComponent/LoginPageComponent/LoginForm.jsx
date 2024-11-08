"use client";
import ActionSubmitButton from "@/utils/action/ActionSubmitButton";
import { loginUser } from "@/utils/action/authAction";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const ref = createRef();
  const [state, fromAction] = useFormState(loginUser, null);

  useEffect(() => {
    if (state && state.success) {
      toast("Successfully logged in");
      ref.current?.reset();
      console.log(state.data);
      const decodedData = jwtDecode(state.data);
      console.log(decodedData);
      if (decodedData.email) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }

    if (state && !state.success) {
      toast.error(state?.message);
    }
  }, [state, ref, router]);

  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow-2xl w-full   md:w-96">
      <form
        ref={ref}
        action={fromAction}
        className="justify-center rounded-lg md:m-0 "
      >
        <div className="">
          <div className="mb-3">
            <span className="mb-2 block font-semibold text-gray-600">
              Email
            </span>
            <input
              placeholder=" Your email "
              required
              className="w-full rounded-md border border-gray-400 bg-white p-2"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <span className="mb-2 block font-semibold text-gray-600">
              Password
            </span>
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              className="w-full rounded-md border border-gray-400 bg-white p-2"
            />
          </div>
          <br />
          <div>
            <ActionSubmitButton>Login</ActionSubmitButton>
          </div>
        </div>
      </form>
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
  );
};

export default LoginForm;
