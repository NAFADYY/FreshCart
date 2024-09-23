import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import frechCartIcon from "../../../public/images/images/freshcart-logo.svg";
import { lazy, Suspense } from "react";
const CartIcon = lazy(() => import("../CartIcon/CartIcon"));

const navigation = [
  { name: "Home", href: "/FreshCart" },
  { name: "Categories", href: "/FreshCart/categories" },
  { name: "Brands", href: "/FreshCart/brands" },
  { name: "Cart", href: "/FreshCart/cart" },
  { name: "Products", href: "/FreshCart/products" },
  { name: "Orders", href: "/FreshCart/allorders" },
  { name: "WishList", href: "/FreshCart/wishlist" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
    navigate("/FreshCart/login");
  };

  return (
    <Disclosure as="nav" className="bg-gray-50 fixed start-0 end-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex py-3 items-center justify-between">
          <div className="relative inset-y-0 right-0 flex items-center lg:hidden">
            {userToken && (
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-900  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="-inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            )}
          </div>
          <div className="flex flex-1 items-center justify-start lg:items-stretch lg:justify-start">
            <Link
              to="/FreshCart"
              className="flex flex-shrink-0 items-center text-black"
            >
              <img src={frechCartIcon} alt="frechCartIcon" />
            </Link>
            {userToken && (
              <div className="hidden sm:ml-6 lg:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-gray-500 hover:text-green-400 block rounded-md py-2 text-base font-medium ${
                        location.pathname == item.href ? "active" : ""
                      } `}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Suspense>
            {userToken && (
              <Link to="/FreshCart/cart">
                <CartIcon />
              </Link>
            )}
          </Suspense>

          <div className="social-media text-black px-2 lg:block hidden">
            <FontAwesomeIcon
              className="mx-1 cursor-pointer"
              icon={faFacebookF}
            />
            <FontAwesomeIcon
              className="mx-1 cursor-pointer"
              icon={faLinkedin}
            />
            <FontAwesomeIcon className="mx-1 cursor-pointer" icon={faTwitter} />
            <FontAwesomeIcon className="mx-1 cursor-pointer" icon={faYoutube} />
          </div>
          <div className="btns flex gap-1">
            {userToken && (
              <button
                onClick={logout}
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-black"
              >
                LogOut
              </button>
            )}
            {!userToken && (
              <>
                <Link
                  to="/FreshCart/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black"
                >
                  Login
                </Link>
                <Link
                  to="/FreshCart/register"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {userToken && (
        <DisclosurePanel className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  `text-gray-500 hover:text-green-400 block rounded-md px-5 py-2 text-base font-medium ${
                    location.pathname == item.href ? "active" : ""
                  }`
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </DisclosurePanel>
      )}
    </Disclosure>
  );
}
