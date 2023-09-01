import { useQuery } from "react-query";
import { UsersTransactions } from "../types";
import axios from "axios";
import LoadingSkelton from "../components/LoadingSkelton";
import { Link } from "react-router-dom";
import { convertToDateString } from "../Helpers/Date";
import { useState } from "react";

const UsersTransaction = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isPreviousData } = useQuery(
    ["alluserstransaction", page],
    async () => {
      const { data } = await axios.get<UsersTransactions>(
        `${process.env.VITE_SERVER_URL}/admin/get-all-transactions?page=${page}`,
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
            {(data as UsersTransactions)?.result.length > 0 ? (
              <>
                <table className="w-full text-sm text-left text-white ">
                  <thead className="text-base">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr.no
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Purchase amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Referred by
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Transaction hash
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      (data as UsersTransactions)?.result.length > 0 &&
                      (data as UsersTransactions).result.map(
                        (user, index: number) => {
                          return (
                            <tr
                              key={index}
                              className={`border-t border-[#3D3C3C]`}
                            >
                              <td className="px-6 py-4 ">{index + 1}</td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium  whitespace-nowrap "
                              >
                                {(user.amount/100).toFixed(2)} $
                              </th>
                              <td className="px-6 py-4 ">
                                {convertToDateString(user.createdAt)}
                              </td>
                              <td className="px-6 py-4 ">
                                {user.email ? user.email : "Not available"}
                              </td>
                              <td className="px-6 py-4">{user.referedBy}</td>
                              <td className="px-6 py-4">
                                <Link
                                  target="_blank"
                                  to={`https://testnet.bscscan.com/tx/${user.transactionId}`}
                                  className="flex gap-2"
                                >
                                  <p>{user.transactionId.slice(0, 16)}...</p>
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
                                  </svg>
                                </Link>
                              </td>
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
            ) : (
              <div>
                <h1 className="text-white">No transactions found</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTransaction;
