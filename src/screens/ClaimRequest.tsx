import { useState } from "react";
import AprroveTransaction from "../components/AprroveTransaction";
import axios from "axios";
import { useQuery } from "react-query";
import { UsersClaimRequest } from "../types";
import LoadingSkelton from "../components/LoadingSkelton";
import { convertToDateString } from "../Helpers/Date";
import { Link } from "react-router-dom";
const ClaimRequest = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const { data, error, isLoading, isPreviousData } = useQuery(
    ["allusersclaimrequest", page],
    async () => {
      const { data } = await axios.get<UsersClaimRequest>(
        `${process.env.VITE_SERVER_URL}/admin/get-all-claimrequest?page=${page}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
  if (error) {
    return (
      <div className="md:border border-[#303030] w-full min-h-screen p-4 md:px-8 md:py-0 text-white text-xl">
        Something went wrong
      </div>
    );
  }
  return (
    <div className="md:border border-[#303030] w-full min-h-screen p-4 md:px-8 md:py-0">
      <div className="z-10 relative overflow-x-auto w-full  p-4 transactiontable my-10 shadow-sm shadow-[#172147]">
        {isLoading ? (
          <LoadingSkelton />
        ) : (
          <>
            {(data as UsersClaimRequest | undefined)?.result.length === 0 ? (
              <p className="text-white text-center">No Claim Request Found !</p>
            ) : (
              <>
                <table className="w-full text-sm text-left text-white ">
                  <thead className="text-base">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr.no
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Claim Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Approve
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Transaction hash
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      (data as UsersClaimRequest)?.result.length > 0 &&
                      (data as UsersClaimRequest).result.map(
                        (user, index: number) => {
                          return (
                            <tr
                              key={index}
                              className={`border-t border-[#3D3C3C]`}
                            >
                              <td className="px-6 py-4 ">{index + 1}</td>
                              <th className="px-6 py-4">{user.email}</th>
                              <td className="px-6 py-4 ">
                                {convertToDateString(user.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                {user.amount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  disabled={!!user.transactionId}
                                  onClick={openModal}
                                  className="bg-[#24A78F] hover:bg-[#378072] disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                                >
                                  Approve
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                {user.transactionId ? (
                                  <Link
                                    className="flex gap-2"
                                    target="_blank"
                                    to={`https://testnet.bscscan.com/tx/${user.transactionId}`}
                                  >
                                    <p>{user.transactionId}</p>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="13"
                                      height="13"
                                      viewBox="0 0 13 13"
                                      fill="none"
                                    >
                                      <path
                                        d="M2.81 12.62L0 9.81L6.37 3.43H1.42V0H12.62V11.2H9.2V6.25L2.81 12.62Z"
                                        fill="#FB4DA8"
                                      />
                                    </svg>{" "}
                                  </Link>
                                ) : (
                                  <p>Not available</p>
                                )}
                              </td>
                              <AprroveTransaction
                                user={user}
                                closeModal={closeModal}
                                isOpen={isOpen}
                              />
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
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-2 leading-tight text-sm text-white font-bold bg-gray-900 rounded-lg  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-600"
                      >
                        Previous
                      </button>
                    </li>
                    <div className="flex gap-2 px-3">
                      {data?.result &&
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClaimRequest;
