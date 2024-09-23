import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { CheckOut } from "../../hooks/useOrders";
import * as Yup from "yup";
import { useParams } from "react-router";

const CheckOutConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const validationSchema = Yup.object({
    details: Yup.string().required("Address field is required"),
    phone: Yup.string().required("phone field is required"),
    city: Yup.string().required("Passwocityrd field is required"),
  });

  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues,
    onSubmit: async () => {
      setIsLoading(true);
      const data = await CheckOut(values, id, userToken);
      location.href = await data;
    },
    validationSchema,
  });

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center font-bold">CheckOut Confirm</h2>

      <form
        className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address Details
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="text"
            id="details"
            name="details"
            placeholder="Address Details"
            onChange={handleChange}
            value={values.details}
          />
          {touched.details && errors.details && (
            <p className="text-red-500">{errors.details}</p>
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
            type="tel"
            id="phone"
            name="phone"
            placeholder="+2001150152510"
            onChange={handleChange}
            value={values.phone}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            City
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            type="text"
            id="city"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={values.city}
          />
          {touched.city && errors.city && (
            <p className="text-red-500">{errors.city}</p>
          )}
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:hover:bg-gray-500 w-full  text-white text-sm font-bold py-2 px-4 rounded-md  transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Confirm"
          ) : (
            <FontAwesomeIcon
              className="animate-spin h-4 w-4"
              icon={faSpinner}
            ></FontAwesomeIcon>
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckOutConfirm;
