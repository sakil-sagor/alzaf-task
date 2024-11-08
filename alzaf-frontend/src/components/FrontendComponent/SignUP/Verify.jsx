import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  const isVerifying = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (isVerifying.current) return;
      isVerifying.current = true;

      try {
        const response = await fetch(
          `https://alzaf-server.vercel.app/api/v1/users/signup-verify/${token}`
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
        setMessage(error.response?.data?.message || "An error occurred");
      } finally {
        isVerifying.current = false;
      }
    };

    if (token) {
      verifyEmail();
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <div className="flex  flex-col justify-center items-center">
        <p className="text-green-800 font-bold text-xl text-center">
          {message === "Invalid token or expired session" ? (
            <p className="text-red-700"> {message}</p>
          ) : (
            <div>
              <p> {message}</p>
              Please Log in here...
              <br />
              <button className="py-1 px-3 mt-4 bg-blue-700 text-white font-semibold hover:bg-white hover:text-blue-900 rounded border-2 border-blue-900 duration-200 ">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default Verify;
