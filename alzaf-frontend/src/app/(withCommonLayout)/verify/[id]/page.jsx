"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Verify = ({ params }) => {
  const [message, setMessage] = useState("");
  const token = params?.id;
  const isVerifying = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (isVerifying.current) return;
      isVerifying.current = true;

      try {
        const response = await fetch(
          `https://alzaf-server.vercel.app/api/v1/users/signup-verify/${params?.id}`
        );
        const data = await response.json();

        if (data?.success === true) {
          setMessage("Verification completed successfully ...");
          toast.success("You are verified");
        } else {
          toast.error(data?.message);
          setMessage("Invalid token or expired session");
        }
      } catch (error) {
        setMessage("An error occurred while verifying your email.");
        toast.error("An error occurred while verifying your email.");
      } finally {
        isVerifying.current = false;
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        {message === "Invalid token or expired session" ? (
          <p className="text-red-700 font-bold text-xl text-center">
            {message}
          </p>
        ) : (
          <div>
            <p className="text-green-800 font-bold text-xl text-center">
              {message}
            </p>
            Please Log in here...
            <br />
            <button className="py-1 px-3 mt-4 bg-blue-700 text-white font-semibold hover:bg-white hover:text-blue-900 rounded border-2 border-blue-900 duration-200">
              <Link href="/login">Login</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
