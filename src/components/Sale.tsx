import { useEffect, useState } from "react";
import Presale from "./Presale";
import axios from "axios";
import TransactionTable from "./TransactionTable";
import SaleNavbar from "./SaleNavbar";
import Purchase from "./Purchase";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  useContract,
  useTransferToken,
  useBalance,
  Web3Button,
  useConnectionStatus,
  ConnectWallet,
} from "@thirdweb-dev/react";
import LayoutAdmin from "../screens/LayoutAdmin";
import ClaimHistory from "./ClaimHistory";

const Sale = () => {
  const connectionStatus = useConnectionStatus();

  const [show, setShow] = useState(false);
  const [leftTokens, setLeftTokens] = useState(0);
  const [userAllocation, setUserAllocation] = useState(0);
  const [referalLink, setReferalLink] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const contractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
  const toAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
  const { data, isLoading } = useBalance(contractAddress);
  const [AvailableReward, setAvailableReward] = useState(0);
  const { contract } = useContract(contractAddress);
  const { mutateAsync: transferTokens, isSuccess } = useTransferToken(contract);

  const transferAmt = async () => {
    try {
      const data = await transferTokens({
        to: toAddress, // Address to transfer to
        amount: values.BNB, // Amount to transfer
      });
      if (data.receipt.status === 1) {
        toast.success("Transaction successful");
        purchaseRequest(data.receipt.blockHash, data.receipt.transactionHash);
      }
      console.log(data, "data");
    } catch (error) {
      toast.error("Transaction failed");
      console.log(error, "error");
    }
  };

  console.log(isSuccess, "isSuccess");

  const closeModal = () => {
    setShowTransactionModal(false);
  };
  const openWalletConnect = () => {
    setShowTransactionModal(true);
  };
  const { values, handleBlur, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: {
        BNB: "",
      },
      onSubmit: () => {
        transferAmt();
      },
    });

  const fetchUserAllocation = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.VITE_SERVER_URL}/users/gettotal`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (status === 200) {
        return setUserAllocation(data.total.toFixed());
      } else {
        setUserAllocation(0);
      }
    } catch (error) {
      if ((error as any).response.status == 404) {
        localStorage.removeItem("token");
        return (window.location.href = "/login");
      }
    }
  };

  const purchaseRequest = async (
    sentFromaccount: string,
    TransactionHash: string
  ) => {
    try {
      const { status } = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/addTransaction`,
        {
          txid: TransactionHash,
          account: sentFromaccount,
          amount: (values as any)?.BNB * 216.65 * 100,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (status == 200) {
        handleReset(null);
        openWalletConnect();
        fetchUserAllocation();
        fetchLeftTokens();
      }
    } catch (error) {
      toast.error("Transaction failed");
    }
  };
  const fetchLeftTokens = async () => {
    const { data, status } = await axios.get(
      `${process.env.VITE_SERVER_URL}/users/getallamount`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    if (status === 200) {
      return setLeftTokens(data.total.toFixed());
    } else {
      setLeftTokens(0);
    }
  };
  const fetchReferalId = async () => {
    const { data, status } = await axios.get(
      `${process.env.VITE_SERVER_URL}/users/getreferalId`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    if (status === 200) {
      setAvailableReward(data.reward);
      return setReferalLink(
        `${window.location.origin}/signup/${data.referalId}`
      );
    } else {
      return setReferalLink("No referal link found");
    }
  };
  useEffect(() => {
    Promise.allSettled([
      fetchUserAllocation(),
      fetchLeftTokens(),
      fetchReferalId(),
    ]);
  }, []);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referalLink);
    toast.success("Copied to clipboard");
  };
  const claimReward = async () => {
    try {
      const { status } = await axios.post(
        `${process.env.VITE_SERVER_URL}/users/claimReward`,
        {
          amount: AvailableReward,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (status === 200) {
        fetchReferalId();
        return toast.success("Reward claimed successfully");
      }
    } catch (error) {
      toast.error("Reward claim failed");
    }
  };
  return (
    <>
      <div className="grid bg-[#070709] relative grid-cols-1 items-center md:flex md:flex-col justify-center p-4  gap-4">
        <SaleNavbar />
        <Presale />
        <div className="flex w-full justify-between text-sm  max-w-3xl z-10 items-center text-left rounded-lg shadow-orange-50 bg-opacity-20 backdrop-blur-sm  salecard p-4  gap-2">
          <p className="text-white  text-left  font-semibold break-all">
            Your allocation
          </p>
          <div className="flex gap-4 items-center text-white">
            {userAllocation}
            <img src="/assets/logo.svg" width={25} height={10} />
          </div>
        </div>
        <div className="z-10 flex items-end gap-4 flex-col md:flex-row w-full max-w-3xl justify-center md:justify-between">
          <div className=" flex flex-col gap-3  w-full">
            <div className="flex w-full justify-start flex-col text-sm items-center text-left rounded-lg shadow-orange-50 bg-opacity-20 backdrop-blur-sm  salecard p-4 gap-2">
              <div className="flex justify-between w-full">
                <p className="text-white  text-left text-base font-semibold">
                  Your Reward
                </p>
                <div className="flex gap-4 items-center text-white">
                  {AvailableReward.toFixed(2)} $
                </div>
              </div>
              <button
                title={
                  AvailableReward === 0
                    ? "Team purchase should be more than 1000$ to claim and view the rewards"
                    : "Claim Reward"
                }
                disabled={AvailableReward === 0}
                onClick={() => {
                  claimReward();
                }}
                className="flex disabled:cursor-not-allowed text-center my-3 justify-center  bg-[#EE3C99] rounded h-full p-2.5 font-bold  w-full gap-4 items-center text-white"
              >
                Claim Reward
              </button>
            </div>
            <div className="flex flex-col rounded-lg shadow-orange-50  bg-[#1C2129] bg-opacity-20 backdrop-blur-sm salecard  items-start justify-center text-center  p-6  md:p-8 gap-2">
              <div className="flex items-center gap-4 justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M13.2 8.4H10.8V6H13.2M13.2 18H10.8V10.8H13.2M12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0Z"
                    fill="#EE3C99"
                  />
                </svg>
                <h1 className="text-xl font-medium tracking-wider text-[#EE3C99]">
                  Sale information
                </h1>
              </div>
              <div className="flex flex-col text-left gap-4 my-4">
                <p className="text-white  font-medium text-sm">
                  Token Total Supply: 100,000,000
                </p>
                <p className="text-white  font-medium text-sm">
                  Presale Allocation: 10,000,000 (10%)
                </p>
                <p className="text-white  font-medium text-sm">
                  Presale Hardcap: 30 BNB
                </p>
                <p className="text-white  font-medium text-sm">
                  Token Price: 1 RDZ = 0.005 BNB
                </p>
                <p className="text-white  font-medium text-sm">
                  Minumum Buy: 10000 RDZ
                </p>
                <p className="text-white  font-medium text-sm">
                  Maximum Buy: 50000 RDZ
                </p>
                <p className="text-white  font-medium text-sm">
                  Softcap: 50,000 BNB
                </p>
                <p className="text-white  font-medium text-sm">
                  Total BNB Collected
                </p>
              </div>
              <div className="flex w-full flex-col">
                <div className="flex justify-between w-full">
                  <p className="text-white text-sm font-medium">
                    {leftTokens ? leftTokens : 0} RDZ
                  </p>
                  <p className="text-white text-sm font-medium">
                    200,00,000 RDZ
                  </p>
                </div>
                <div className="w-full rounded-full h-2.5 bg-gray-700">
                  <div
                    className="bg-[#14BE81] h-2.5 rounded-full"
                    style={{
                      width: `${(leftTokens / 2e5) * 100}%`,
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-4 justify-center">
            <div className="flex w-full h-full flex-col justify-between  text-sm items-center text-left rounded-lg shadow-orange-50 bg-opacity-20 backdrop-blur-sm  salecard  gap-2 ">
              <p className="text-white text-sm text-left p-4   font-normal ">
                {referalLink.slice(0, 20)}...{referalLink.slice(-20)}
              </p>
              <button
                onClick={copyToClipboard}
                className="flex text-center justify-center  bg-[#EE3C99] rounded h-full p-4 font-bold  w-full gap-4 items-center text-white"
              >
                Copy Refferal Link
              </button>
            </div>{" "}
            <form
              onSubmit={handleSubmit}
              className="flex w-full  flex-col rounded-lg shadow-orange-50  items-start text-center  bg-opacity-20 backdrop-blur-sm salecard p-6 m-5  md:p-8 gap-2"
            >
              <h1 className="text-xl font-black tracking-wider my-2 text-[#EE3C99]">
                Buy RDZ tokens
              </h1>
              <h1 className="text-white text-sm my-2">
                Available USDT Balance : {isLoading ? 0 : data?.displayValue}{" "}
                USDT
              </h1>
              {show ? (
                <div className="flex w-full  bg-[#172042] rounded-md salecard">
                  <input
                    type="number"
                    name="RDZ"
                    autoComplete="off"
                    disabled
                    value={(values as any)?.BNB * 216.65 * 100}
                    placeholder="You will get"
                    className="bg-[#172042] outline-none placeholder:text-sm placeholder:text-white no-spinners placeholder-shown:text-white text-white p-3 md:p-4 w-full"
                  />
                  <div className="flex bg-[#172042] px-4">
                    <img
                      src={"/assets/logo.svg"}
                      width={30}
                      height={30}
                      alt="notfound"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex px-2 bg-[#172042] items-center justify-center">
                    {" "}
                    <p className="text-white text-sm">RDZ</p>
                  </div>
                </div>
              ) : (
                <div className="flex w-full bg-[#172042] rounded-md salecard">
                  <input
                    type="number"
                    name="BNB"
                    value={values.BNB}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="Enter amount in USDT"
                    className={
                      "bg-[#172042] outline-none placeholder:text-sm no-spinners placeholder:text-white placeholder-shown:text-white text-white p-3 md:p-4 w-full "
                    }
                  />

                  <div className="flex bg-[#172042] px-4">
                    <img
                      src={"/assets/USDT.svg"}
                      width={30}
                      height={30}
                      alt="notfound"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex px-2 bg-[#172042] items-center justify-center">
                    {" "}
                    <span className="text-white text-sm">USDT</span>
                  </div>
                </div>
              )}
              <div
                className="w-full justify-center flex my-2 cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                <img
                  src={"/assets/below.svg"}
                  width={20}
                  height={10}
                  alt="below"
                />
              </div>
              {!show ? (
                <div className="flex w-full  bg-[#172042] rounded-md">
                  <input
                    type="number"
                    disabled
                    name="RDZ"
                    autoComplete="off"
                    value={(values as any)?.BNB * 216.65 * 100}
                    placeholder="You will get"
                    className="bg-[#172042] outline-none placeholder:text-sm placeholder:text-white no-spinners placeholder-shown:text-white text-white p-3 md:p-4 w-full"
                  />
                  <div className="flex bg-[#172042] px-4">
                    <img
                      src={"/assets/logo.svg"}
                      width={30}
                      height={30}
                      alt="notfound"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex px-2 bg-[#172042] items-center justify-center">
                    {" "}
                    <p className="text-white text-sm">RDZ</p>
                  </div>
                </div>
              ) : (
                <div className="flex w-full bg-[#172042] rounded-md">
                  <input
                    type="number"
                    name="BNB"
                    value={values.BNB}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="Enter amount in USDT"
                    className={
                      "bg-[#172042] outline-none  no-spinners placeholder:text-sm placeholder:text-white placeholder-shown:text-white text-white p-3 md:p-4 w-full "
                    }
                  />
                  <div className="flex bg-[#172042] px-4 items-center">
                    <img
                      src={"/assets/bnb.svg"}
                      width={30}
                      height={30}
                      alt="notfound"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex px-2 bg-[#172042] items-center justify-center">
                    <span className="text-white text-sm">BNB</span>
                  </div>
                </div>
              )}
              {connectionStatus === "connected" ? (
                <Web3Button
                  onError={(error) => {
                    console.log(error, "web3btnerror");
                  }}
                  type="submit"
                  contractAddress={contractAddress}
                  action={() => {}}
                  className="!bg-[#EE3C99] !w-full !text-white !flex !items-center !gap-4 !justify-center !my-4 buy p-3 md:!p-4 !rounded-md !text-sm "
                >
                  Click To Purchase
                </Web3Button>
              ) : (
                <ConnectWallet
                  btnTitle="Connect your wallet"
                  theme="dark"
                  className="!bg-[#EE3C99] !w-full !text-white !flex !items-center !gap-4 !justify-center !my-4 buy p-3 md:!p-4 !rounded-md !text-sm "
                />
              )}
            </form>
          </div>
        </div>
        <div
          className="absolute inset-0 md:translate-x-full"
          style={{
            content: "",
            position: "absolute",
            zIndex: "0",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            borderRadius: "900px",
            background:
              "linear-gradient(180deg, rgba(167, 36, 104, 0.80) 0%, rgba(14, 37, 157, 0.80) 100%)",
            filter: "blur(250px)",
          }}
        ></div>
        <TransactionTable />
        <ClaimHistory />
        <Purchase isOpen={showTransactionModal} closeModal={closeModal} />
      </div>
    </>
  );
};

export default Sale;
