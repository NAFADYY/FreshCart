import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import useSendCode from "../../../hooks/ForgetPassword/useSendCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ForgetPassContext } from "../../../Contexts/ForgetPassContext";

const ForgetPasswordimport = () => {
  const { setForgetPassKey } = useContext(ForgetPassContext);
  const navigate = useNavigate();
  const { mutateAsync: sendCode, isLoading, isError } = useSendCode();
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email field is required")
      .email("Please enter valid email"),
  });
  const { handleChange, values, touched, errors } = useFormik({
    initialValues,
    validationSchema,
  });

  <Helmet>
    <title>Forget Password</title>
  </Helmet>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center font-bold">Forget Password</h2>

      <form
        className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const req = await sendCode(values.email);
            toast.success(req.data.message);
            setForgetPassKey("12345");
            localStorage.setItem("rePasswordKey", "12345");
            navigate(`/FreshCart/resetPasswordCode/${values.email}`);
          } catch (e) {
            console.error(e.message);
          }
        }}
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
          {isError && <p className="text-red-500">Failed To Send Code!</p>}
        </div>

        <button
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full  text-white text-sm font-bold py-2 px-4 rounded-md  transition duration-300"
          type="submit"
        >
          {isLoading ? (
            <FontAwesomeIcon
              className="animate-spin h-4 w-4"
              icon={faSpinner}
            ></FontAwesomeIcon>
          ) : (
            "Send Code"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordimport;
