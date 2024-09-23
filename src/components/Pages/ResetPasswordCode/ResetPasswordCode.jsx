import VerificationInput from "react-verification-input";
import useVerifyResetCode from "../../../hooks/ForgetPassword/useVerifyResetCode";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

const ResetPasswordCode = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const { email } = useParams();
  const { mutateAsync: verifyResetCode, isError, error } = useVerifyResetCode();
  return (
    <div className="max-w-80 m-auto py-20">
      <div className="mx-auto space-y-6">
        <div className="">
          <h1 className="py-5 text-center text-xl">Verify Reset Code</h1>
          <p className="text-sm font-light leading-none text-center text-gray-400">
            <a className="text-green-500" href="mailto:mail@mail.com">
              {email}
            </a>
          </p>
        </div>
        <div
          className="flex mx-auto justify-center items-center gap-2"
          autoComplete="off"
          id="validate"
        >
          <button
            className="text-green-500 text-3xl hover:text-green-900"
            onClick={() => {
              if (count != 3) setCount(count - 1);
            }}
          >
            -
          </button>

          <VerificationInput
            onComplete={async (value) => {
              try {
                await verifyResetCode(value);
                toast.success(
                  "The verification code has been successfully reset."
                );
                navigate(`/FreshCart/resetPassword/${email}`);
              } catch (e) {
                console.log(e.message);
              }
            }}
            classNames={{ character: "text-green-500" }}
            length={count}
            validChars={"0-9"}
          />

          <button
            className="text-green-500 text-3xl hover:text-green-900"
            onClick={() => {
              if (count != 8) setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm font-light leading-none text-center text-gray-400 ">
            Code valid for:
            <span className="text-green-500 px-2">
              <span id="hour">00</span>
              <span>:</span>
              <span id="minutes">00</span>
              <span>:</span>
              <span id="seconds">00</span>
            </span>
          </p>
        </div>
        {isError && (
          <p className="text-red-500 text-center">
            {error.response.data.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordCode;
