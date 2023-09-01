import axios from "axios";
import { useQuery } from "react-query";
import { UsersClaimRequests } from "../types";
import LoadingSkelton from "./LoadingSkelton";
import { convertToDateString } from "../Helpers/Date";
import { useState } from "react";
const ClaimHistory = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isPreviousData } = useQuery(
    ["getclaimrequests", page],
    async () => {
      const { data } = await axios.get<UsersClaimRequests>(
        `${process.env.VITE_SERVER_URL}/users/getclaimrequests?page=${page}`,
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
      <div className="text-center text-white text-5xl">
        Something went wrong
      </div>
    );
  }
  return (
    <div className="z-10 relative overflow-x-auto w-full max-w-3xl  p-4 transactiontable my-10 shadow-sm shadow-[#172147]">
      {isLoading ? (
        <LoadingSkelton />
      ) : (
        <>
          {(data as UsersClaimRequests)?.claimRequests.length > 0 ? (
            <>
              <table className="w-full text-sm text-left text-white ">
                <thead className="text-base">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sr.no
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Purchase date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Referral
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Transaction hash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    (data as UsersClaimRequests)?.claimRequests.length >
                      0 &&
                    (data as UsersClaimRequests).claimRequests.map(
                      (transaction, index: number) => {
                        return (
                          <tr
                            key={index}
                            className={`border-t border-[#3D3C3C]`}
                          >
                            <td className="px-6 py-4 ">{index+1}</td>
                            <td className="px-6 py-4 ">{transaction.email}</td>
                            <td className="px-6 py-4 ">{transaction.status}</td>
                            <td className="px-6 py-4 ">
                              {transaction.amount.toFixed(2)}
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap "
                            >
                              {convertToDateString(transaction.createdAt)}
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
                      onClick={() => setPage((old) => Math.max(old - 1, 1))}
                      disabled={page === 1}
                      className="px-3 py-2 leading-tight text-sm text-white font-bold bg-gray-900 rounded-lg  rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-600"
                    >
                      Previous
                    </button>
                  </li>
                  <div className="flex gap-2 px-3">
                    {data?.claimRequests &&
                      [...Array(Math.ceil(data.totalPages))].map((_, index) => {
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
                      })}
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
              No Claim Request's yet
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimHistory;
