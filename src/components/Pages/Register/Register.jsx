import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SuccessAlert } from "../../Alerts/Alerts";
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required").max(20).min(3),
    email: Yup.string()
      .required("Email field is required")
      .email("Please enter valid email"),
    password: Yup.string()
      .required("Password field is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
      ),
    rePassword: Yup.string()
      .required("rePassword field is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone field is required")
      .matches(
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/,
        "Invalid phone number"
      ),
  });

  const onSubmit = () => {
    setIsLoading(true);
    setIsError(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        SuccessAlert("Register", "Registeration Successful");
        setTimeout(() => {
          navigate("/FreshCart/login");
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold">Register Page</h2>
      <form
        className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            required
          />
          {touched.name && errors.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rePassword"
          >
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="password"
            id="rePassword"
            name="rePassword"
            placeholder="********"
            onChange={handleChange}
            value={values.rePassword}
            onBlur={handleBlur}
          />
          {touched.rePassword && errors.rePassword && (
            <p className="text-red-500">{errors.rePassword}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="number"
            id="phone"
            name="phone"
            placeholder="phone number"
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500">{errors.phone}</p>
          )}
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full  text-white text-sm font-bold py-2 px-4 rounded-md  transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Register"
          ) : (
            <FontAwesomeIcon
              className="animate-spin h-4 w-4"
              icon={faSpinner}
            ></FontAwesomeIcon>
          )}
        </button>

        {isError && <p className="text-red-600 text-center pt-4">{isError}</p>}
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Already have account ?</span>
          <Link
            to="/FreshCart/login"
            className="text-green-500 hover:text-green-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
