import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
type WalletConnectProps = {
  closeModal: () => void;
  isOpen: boolean;
};
export default function WalletConnect({
  closeModal,
  isOpen,
}: WalletConnectProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl salecard text-white  p-6 text-left align-middle shadow-xl transition-all">
                  {false ? null : (
                    <Dialog.Title
                      as="h3"
                      className="flex relative justify-center text-xl font-bold leading-6 "
                    >
                      Connect Your Wallet
                      <svg
                        onClick={closeModal}
                        className="cursor-pointer  absolute right-0 fill-white"
                        height="12px"
                        viewBox="0 0 320.591 320.591"
                        width="12px"
                      >
                        <path d="M30.391 318.583a30.37 30.37 0 01-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 01-21.256 7.288z"></path>
                        <path d="M287.9 318.583a30.37 30.37 0 01-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 01-23.078 7.288z"></path>
                      </svg>
                    </Dialog.Title>
                  )}

                  {false ? (
                    <p className="text-black text-2xl text-center">
                      No Wallet Found
                    </p>
                  ) : (
                    <div className="my-2">
                      <RadioGroup className="grid grid-cols-1 w-full justify-around gap-4 p-4 flex-wrap text-white">
                        <RadioGroup.Option
                          value="as"
                          className={"bg-white rounded-2xl"}
                        >
                          {() => (
                            <div
                              onClick={() => {
                                closeModal();
                              }}
                              className={` cursor-pointer flex text-black  items-center flex-row justify-between py-2 px-4 rounded-xl `}
                            >
                              <p className="md:text-xl text-sm font-bold text-center mt-2">
                                Wallet connect
                              </p>
                              <img
                                alt="notfound"
                                src={"/assets/walletconnect.svg"}
                                width={100}
                                height={80}
                                className="cursor-pointer"
                              />
                            </div>
                          )}
                        </RadioGroup.Option>
                        <RadioGroup.Option
                          value="as"
                          className={"bg-white rounded-2xl"}
                        >
                          {() => (
                            <div
                              onClick={() => {
                                closeModal();
                              }}
                              className={` cursor-pointer flex text-black  items-center flex-row justify-between py-2 px-4 pr-8 rounded-xl `}
                            >
                              <p className="md:text-xl text-sm font-bold text-center mt-2">
                                Metamask
                              </p>
                              <img
                                alt="notfound"
                                src={"/assets/metamask.svg"}
                                width={60}
                                height={60}
                                className="cursor-pointer"
                              />
                            </div>
                          )}
                        </RadioGroup.Option>
                      </RadioGroup>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
