import axios from "axios";
import { useQuery } from "react-query";
import { UsersData } from "../types";
import LoadingSkelton from "../components/LoadingSkelton";
import { convertToDateString } from "../Helpers/Date";
import GetUsersTransaction from "../components/GetUsersTransaction";
import { useState } from "react";
import GetAllTeamMembers from "../components/GetAllTeamMembers";

const AllUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const showModal = () => setIsOpen(true);
  const [_id, set_id] = useState("");
  const [memberId, setMemberId] = useState("");
  const { data, error, isLoading, isPreviousData } = useQuery(
    ["allUsers", page],
    async () => {
      const { data } = await axios.get<UsersData>(
        `${process.env.VITE_SERVER_URL}/admin/get-all-users?page=${page}`,
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
                    Joining Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Team
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Self purchase{" "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Team purchase{" "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  (data as UsersData)?.result.length > 0 &&
                  (data as UsersData).result.map((user, index: number) => {
                    return (
                      <tr
                        key={user._id}
                        className={`border-t border-[#3D3C3C]`}
                      >
                        <td className="px-6 py-4 ">{index + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium  whitespace-nowrap "
                        >
                          {user.email}
                        </th>
                        <td className="px-6 py-4 ">
                          {convertToDateString(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 cursor-pointer">
                          <button
                            disabled={user.referedUsers === 0}
                            onClick={() => {
                              setIsModalOpen(true);
                              setMemberId(user?.referalId);
                            }}
                            className="border-b pb-2"
                          >
                            {user.referedUsers}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {(user.selfpurchase / 100).toFixed(2)} $
                        </td>
                        <td className="px-6 py-4">
                          {(user.totalReferedUsersPurchaseSum / 100).toFixed(2)}{" "}
                          $
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              showModal();
                              set_id(user._id);
                            }}
                            className="bg-[#A72468] hover:bg-[#A72468] text-white font-bold py-2 px-4 rounded-md"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
                  {data?.totalPages &&
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
        )}
        <GetUsersTransaction
          _id={_id}
          closeModal={closeModal}
          isOpen={isOpen}
        />
        <GetAllTeamMembers
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          _id={memberId}
        />
      </div>
    </div>
  );
};

export default AllUsers;
