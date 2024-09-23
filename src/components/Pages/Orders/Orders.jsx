import { GetUserOrders } from "../../../hooks/useOrders";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
import Loader from "../../Loader/Loader";
import noOrders from "../../../../public/images/images/noOrders.jpg";

const Orders = () => {
  const { data, isLoading, isError } = GetUserOrders();
  const orders = data?.data;

  if (isError) {
    return <ErrorComponenet />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="py-2 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
            Orders History
          </h2>
          {orders.length < 1 && (
            <div className="text-center py-10">
              <img
                src={noOrders}
                alt="No Orders"
                className="m-auto block"
              ></img>
              <div className="text-lg">No orders have been placed yet.</div>
            </div>
          )}

          {orders?.map((order, index) => (
            <div key={index} className="mt-7 border border-gray-300 pt-9">
              <div className="flex max-md:flex-col items-center justify-between px-1 md:px-11">
                <div className="data">
                  <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                    Order : #{order.id}
                  </p>
                  <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                    Date : {new Date(`${order.createdAt}`).toDateString()}
                  </p>
                  <p className="capitalize font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                    Payment Method Type : {order.paymentMethodType}
                  </p>
                </div>
              </div>
              <svg
                className="my-9 w-full"
                xmlns="http://www.w3.org/2000/svg"
                width={1216}
                height={2}
                viewBox="0 0 1216 2"
                fill="none"
              >
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg>
              {order.cartItems?.map((pro, index) => (
                <div
                  key={index}
                  className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11"
                >
                  <div className="grid grid-cols-4 w-full gap-4">
                    <div className="col-span-4 sm:col-span-1">
                      <img
                        src={pro.product.imageCover}
                        alt={pro.product.title}
                        className="max-sm:mx-auto w-40"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3   flex flex-col justify-center ">
                      <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap line-clamp-1">
                        {pro.product.title}
                      </h6>
                      <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                        Category: {pro.product.category.name}
                      </p>
                      <p className="font-normal text-lg  text-gray-500  whitespace-nowrap">
                        By: {pro.product.brand.name}
                      </p>
                      <div className="flex items-center max-sm:flex-col gap-x-10 ">
                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                          Qty: {pro.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <svg
                className="mt-9 w-full"
                xmlns="http://www.w3.org/2000/svg"
                width={1216}
                height={2}
                viewBox="0 0 1216 2"
                fill="none"
              >
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg>
              <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                <div className="flex max-sm:flex-col-reverse items-center">
                  <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-red-600">
                    <svg
                      width={40}
                      height={41}
                      viewBox="0 0 40 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="stroke-gray-600 transition-all duration-500 group-hover:stroke-red-600"
                        d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259"
                        stroke=""
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    cancel order
                  </button>
                  <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                    Payment Status: {order.isPaid ? "Paid" : "Not paid"}
                  </p>
                </div>

                <p className="font-normal text-lg text-gray-500 leading-8  whitespace-nowrap">
                  Status:
                  <span className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                    {order.isDelivered ? " Delivered" : " In Progress"}
                  </span>
                </p>
                <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                  <span className="text-gray-500">Total Price: </span> &nbsp;
                  {order.totalOrderPrice.toLocaleString()} EGP
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Orders;
