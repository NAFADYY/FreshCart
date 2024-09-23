import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import useResetPassword from "../../../hooks/ForgetPassword/useResetPassword";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

const ResetPassword = () => {
  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email } = useParams();
  const {
    mutateAsync: resetPassword,
    isError: resetPasswordError,
    error: passError,
    isLoading: resetPasswordLoading,
  } = useResetPassword();
  const initialValues = {
    password: "",
    rePassword: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password field is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
      ),
    rePassword: Yup.string()
      .required("rePassword field is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const { handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues,
    validationSchema,
  });

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold">Reset Password</h2>

      <form
        className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const req = await resetPassword({
              email: email,
              newPassword: values.password,
            });
            console.log(req);
            toast.success("Password Has Been Changed Successfully");
            setUserToken(req.data.token);
            localStorage.setItem("userToken", req.data.token);
            navigate("/FreshCart");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="password"
            id="password"
            name="password"
            placeholder="********"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            required
          />
          {touched.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={handleChange}
            placeholder="********"
            onBlur={handleBlur}
            value={values.rePassword}
            required
          />
          {touched.rePassword && errors.rePassword && (
            <p className="text-red-500">{errors.rePassword}</p>
          )}
        </div>
        {resetPasswordError && (
          <p className="text-red-500 py-2 text-center">
            {passError.response.data.message}
          </p>
        )}

        <button
          disabled={resetPasswordLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full  text-white text-sm font-bold py-2 px-4 rounded-md  transition duration-300"
          type="submit"
        >
          {resetPasswordLoading ? (
            <FontAwesomeIcon
              className="animate-spin h-4 w-4"
              icon={faSpinner}
            ></FontAwesomeIcon>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
