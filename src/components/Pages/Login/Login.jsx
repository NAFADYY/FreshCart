import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email field is required")
      .email("Please enter valid email"),
    password: Yup.string().required("Password field is required"),
  });
  const onSubmit = () => {
    setIsLoading(true);
    setIsError(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setIsLoading(false);
        setUserToken(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        if (location.pathname == "/FreshCart/login") {
          navigate("/FreshCart");
        } else {
          navigate(location.pathname);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold">Login Page</h2>

      <form
        className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            onChange={handleChange}
            value={values.email}
            required
          />
          {touched.email && errors.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
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
            onChange={handleChange}
            value={values.password}
            required
          />
          {touched.password && errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full  text-white text-sm font-bold py-2 px-4 rounded-md  transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <FontAwesomeIcon
              className="animate-spin h-4 w-4"
              icon={faSpinner}
            ></FontAwesomeIcon>
          )}
        </button>
        {isError && <p className="text-red-600 text-center pt-4">{isError}</p>}
        <p className="flex flex-col items-center justify-center mt-5 text-center text-md text-gray-500">
          <Link
            to="/FreshCart/forgetPassword"
            className="underline hover:text-green-500 hover:underline cursor-pointer transition ease-in duration-300"
          >
            <span>Forget Your Password?</span>
          </Link>
        </p>
        <p className="flex flex-col items-center justify-center mt-2 text-center text-md text-gray-500">
          <span>Don{`'`}t have an account?</span>
          <Link
            to="/FreshCart/register"
            className="text-green-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
