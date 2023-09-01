import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function SaleNavbar({ isAdminPage }: { isAdminPage?: boolean }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (isAdminPage) window.location.href = "/admin/login";
    else window.location.href = "/login";
  };
  return (
    <>
      <nav className="md:p-6 w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex justify-between z-10">
                <Link to={"/"}>
                  <img
                    src="/assets/randomz.png"
                    width={120}
                    height={80}
                    alt={"notfound"}
                    className="md:flex hidden"
                  />
                </Link>
                <div className="flex gap-4 z-10">
                  {!isAdminPage && (
                    <ConnectWallet
                      theme="dark"
                      className="!h-12 md:!flex !hidden"
                    />
                  )}
                  {!localStorage.getItem("token") ? (
                    <Link
                      to={isAdminPage ? "/admin/login" : "/login"}
                      className=" w-42 h-12 justify-center  hidden md:flex items-center px-4 text-center rounded-md  bg-[#1C2129] text-white "
                    >
                      Login
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className=" w-42 h-12 justify-center  hidden md:flex items-center px-4 text-center rounded-md  bg-[#1C2129] text-white "
                    >
                      Logout{" "}
                      <svg
                        className="ml-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 19 20"
                        fill="none"
                      >
                        <path
                          d="M10.5571 0H8.44643V10.5536H10.5571V0ZM15.6545 2.29012L14.1559 3.78873C15.8867 5.1818 16.8893 7.28196 16.8893 9.49821C16.8893 11.4575 16.111 13.3365 14.7255 14.722C13.3401 16.1074 11.4611 16.8857 9.50179 16.8857C5.42811 16.8857 2.11429 13.593 2.11429 9.49821C2.11429 7.29252 3.11688 5.1818 4.83711 3.77818L3.34906 2.29012C-0.650745 5.68837 -1.13621 11.6828 2.26204 15.6826C5.66029 19.6719 11.6547 20.1573 15.6545 16.7591C17.7863 14.9544 19 12.2949 19 9.49821C19 6.72262 17.7758 4.08423 15.6545 2.29012Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div
                  className={`flex md:hidden p-4 h-full items-center justify-between w-full md:w-auto  ${
                    open ? " bg-black " : " bg-transparent "
                  } `}
                >
                  <Link to={"/"}>
                    <img
                      src="/assets/randomz.png"
                      width={120}
                      height={80}
                      alt={"notfound"}
                      className="md:hidden"
                    />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto bg-transparent rounded-md md:hidden text-white focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#EE3C99"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel
                style={{
                  zIndex: 9999,
                }}
              >
                <div className="flex z-10 flex-col bg-black items-center p-4 justify-start order-2 w-full md:hidden">
                  <div className="grid grid-cols-1 gap-4 z-10">
                    {!isAdminPage && (
                      <ConnectWallet
                        theme="dark"
                        className="!h-12 md:!hidden"
                      />
                    )}

                    {!localStorage.getItem("token") ? (
                      <button className="flex w-42 h-full p-2 justify-center  items-center px-4 text-center rounded-md  bg-[#1C2129] text-white ">
                        Login
                      </button>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="flex w-42 h-full justify-center  items-center p-2 text-center rounded-md  bg-[#1C2129] text-white "
                      >
                        Logout{" "}
                        <svg
                          className="ml-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 19 20"
                          fill="none"
                        >
                          <path
                            d="M10.5571 0H8.44643V10.5536H10.5571V0ZM15.6545 2.29012L14.1559 3.78873C15.8867 5.1818 16.8893 7.28196 16.8893 9.49821C16.8893 11.4575 16.111 13.3365 14.7255 14.722C13.3401 16.1074 11.4611 16.8857 9.50179 16.8857C5.42811 16.8857 2.11429 13.593 2.11429 9.49821C2.11429 7.29252 3.11688 5.1818 4.83711 3.77818L3.34906 2.29012C-0.650745 5.68837 -1.13621 11.6828 2.26204 15.6826C5.66029 19.6719 11.6547 20.1573 15.6545 16.7591C17.7863 14.9544 19 12.2949 19 9.49821C19 6.72262 17.7758 4.08423 15.6545 2.29012Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </>
  );
}
