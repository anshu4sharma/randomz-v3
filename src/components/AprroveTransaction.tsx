import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UsersClaims } from "../types";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
type WalletConnectProps = {
  closeModal: () => void;
  isOpen: boolean;
  user: UsersClaims;
};
export default function AprroveTransaction({
  closeModal,
  isOpen,
  user,
}: WalletConnectProps) {
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      transactionid: "",
    },
    onSubmit: async (values) => {
      try {
        const { status } = await axios.post(
          `${process.env.VITE_SERVER_URL}/admin/update-claimrequest`,
          {
            transactionId: values.transactionid,
            status: "approved",
            id: user._id,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (status === 200) {
          toast.success("Claim request approved successfully !");
          handleReset(null);
          closeModal();
        } else {
          toast.error("Something went wrong !");
        }
      } catch (error) {
        toast.error("Something went wrong !");
        console.log(error);
      }
    },
  });

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
                  <div className="flex justify-between flex-col gap-4 p-4">
                    <h3 className="text-base">
                      Approve claim request amount : {user.amount.toFixed(2)}$
                    </h3>
                    <h1>User : {user.email}</h1>
                    <h1>Upload Transaction hash link :</h1>
                    <form onSubmit={handleSubmit} className="flex w-full gap-4">
                      <div className="flex text-white w-full">
                        <input
                          type="text"
                          id={user._id}
                          value={values.transactionid}
                          onChange={handleChange}
                          required
                          placeholder="Enter Transaction Hash here ...."
                          className="rounded-md  p-3 bg-[#2B3D79] text-white w-full h-full"
                          name="transactionid"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#24A78F] hover:bg-[#378072] text-white font-bold py-2 px-4 rounded-md"
                      >
                        Upload
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
