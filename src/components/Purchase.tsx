import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type WalletConnectProps = {
  closeModal: () => void;
  isOpen: boolean;
};

export default function Purchase({ closeModal, isOpen }: WalletConnectProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="fixed inset-0  bg-opacity-75 backdrop-blur-md" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="w-full max-w-xs md:max-w-xl  px-6 py-4 transform bg-[#172042] bg-opacity-90 rounded-2xl shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-2 text-lg font-medium text-white flex justify-center"
                >
                  <div className="my-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 50 48"
                      fill="none"
                    >
                      <path
                        d="M50 23.7727L44.4545 17.4545L45.2273 9.09091L37.0227 7.22727L32.7273 0L25 3.31818L17.2727 0L12.9773 7.22727L4.77273 9.06818L5.54545 17.4318L0 23.7727L5.54545 30.0909L4.77273 38.4773L12.9773 40.3409L17.2727 47.5682L25 44.2273L32.7273 47.5454L37.0227 40.3182L45.2273 38.4545L44.4545 30.0909L50 23.7727ZM20.4545 35.1364L11.3636 26.0455L14.5682 22.8409L20.4545 28.7045L35.4318 13.7273L38.6364 16.9545L20.4545 35.1364Z"
                        fill="#01CC9C"
                      />
                    </svg>
                  </div>
                </Dialog.Title>
                <p className="my-4 text-base md:text-lg text-white tracking-wider text-center">
                You have successfully purchased RDZ tokens. You will receive RDZ tokens in your wallet once the private sale ends.
                </p>
                <Dialog.Description className="mt-4 text-sm text-white tracking-wider text-center">
                  <button onClick={closeModal} className="bg-[#FB4DA8] px-4 py-3 w-28 rounded-lg">
                    Ok
                  </button>
                </Dialog.Description>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}