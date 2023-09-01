import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { TeamMembers } from "../types";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingSkelton from "./LoadingSkelton";
import { convertToDateString } from "../Helpers/Date";
type WalletConnectProps = {
  closeModal: () => void;
  isOpen: boolean;
  _id: string;
};
export default function GetAllTeamMembers({
  closeModal,
  isOpen,
  _id,
}: WalletConnectProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isPreviousData } = useQuery(
    ["getallteammatesadmin", page],
    async () => {
      const { data } = await axios.get(
        `${process.env.VITE_SERVER_URL}/admin/find-team/${_id}?page=${page}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      return data;
    },
    {
      enabled: isOpen && _id !== "",
      keepPreviousData: true,
    }
  );
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-lg bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {isError ? (
                  <div className="bg-[#303030] w-full min-h-screen p-4 md:px-8 md:py-0 text-white text-xl">
                    Something went wrong
                  </div>
                ) : (
                  <Dialog.Panel className="w-full relative max-w-2xl min-w-fit transform overflow-hidden rounded-2xl salecard text-white  p-6 text-left align-middle shadow-xl transition-all">
                    <div
                      role="button"
                      onClick={closeModal}
                      className="flex absolute right-4 top-2"
                    >
                      <span className="text-xl text-white font-black tracking-widest">
                        X
                      </span>
                    </div>
                    {isLoading ? (
                      <LoadingSkelton />
                    ) : (
                      <>
                        {_id !== "" && (data as TeamMembers).data.length > 0 ? (
                          <>
                            <table className="w-full text-sm text-left text-white ">
                              <thead className="text-base">
                                <tr>
                                  <th scope="col" className="px-6 py-3">
                                    Sr.no
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Email
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Refferal Id
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Total Rewards
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Referred by
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Joining Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {!isLoading &&
                                  (data as TeamMembers)?.data.length > 0 &&
                                  (data as TeamMembers).data.map(
                                    (user, index: number) => {
                                      return (
                                        <tr
                                          key={index}
                                          className={`border-t border-[#3D3C3C]`}
                                        >
                                          <td className="px-6 py-4 ">
                                            {index + 1}
                                          </td>
                                          <th
                                            scope="row"
                                            className="px-6 py-4 font-medium  whitespace-nowrap "
                                          >
                                            {user.email}
                                          </th>
                                          <td className="px-6 py-4 ">
                                            {user.referalId}
                                          </td>
                                          <td className="px-6 py-4 ">
                                            {user.reward.toFixed(2)}
                                          </td>
                                          {user.referedBy ? (
                                            <td className="px-6 py-4">
                                              {user.referedBy}
                                            </td>
                                          ) : (
                                            <td className="px-6 py-4">-</td>
                                          )}{" "}
                                          <th
                                            scope="row"
                                            className="px-6 py-4 font-medium  whitespace-nowrap "
                                          >
                                            {convertToDateString(
                                              user.createdAt
                                            )}
                                          </th>
                                        </tr>
                                      );
                                    }
                                  )}
                              </tbody>
                            </table>
                            <nav
                              aria-label="Page navigation example"
                              className="my-4 mx-4 block"
                            >
                              <ul className="inline-flex items-center -space-x-px">
                                <li>
                                  <button
                                    onClick={() =>
                                      setPage((old) => Math.max(old - 1, 1))
                                    }
                                    disabled={page === 1}
                                    className="px-3 py-2 leading-tight text-sm text-white font-bold bg-gray-900 rounded-lg  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-600"
                                  >
                                    Previous
                                  </button>
                                </li>
                                <div className="flex gap-2 px-3">
                                  {data?.transactions &&
                                    [...Array(Math.ceil(data.totalPages))].map(
                                      (_, index) => {
                                        return (
                                          <li key={index + 1}>
                                            <button
                                              className={`px-3 py-2 leading-tight text-sm text-white font-bold bg-transparent rounded-lg hover:bg-gray-600 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-600`}
                                              disabled={page === index + 1}
                                              onClick={() => setPage(index + 1)}
                                            >
                                              {index + 1}
                                            </button>
                                          </li>
                                        );
                                      }
                                    )}
                                </div>
                                <li>
                                  <button
                                    onClick={() => {
                                      if (!isPreviousData) {
                                        setPage((old) => old + 1);
                                      }
                                    }}
                                    disabled={data?.totalPages === page}
                                    className="px-3 py-2 leading-tight text-sm text-white font-bold bg-gray-900 rounded-lg  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-600"
                                  >
                                    Next
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          </>
                        ) : (
                          <div className="text-center text-white text-2xl">
                            No Teammate found
                          </div>
                        )}
                      </>
                    )}
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
