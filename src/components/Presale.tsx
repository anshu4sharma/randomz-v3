import { useState, useEffect, useMemo } from "react";
const Presale = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    const targetDate = new Date("August 12, 2023");
    targetDate.setDate(targetDate.getDate() + 10);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = targetDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        const remainingSeconds = Math.floor(timeDifference / 1000);
        setRemainingTime(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const formatTime = useMemo(() => {
    const days = Math.floor(remainingTime / (24 * 60 * 60));
    const hours = Math.floor((remainingTime  % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
    const seconds = remainingTime % 60;
    return (
      <div className="flex gap-4 justify-center items-center z-10">
        <div className="flex bg-[#14171D]  text-white border border-[#EE3C99] rounded-md p-3 md:p-4 font-bold">
          <p>{days}d</p>
        </div>
        <div className="flex bg-[#14171D]  text-white border border-[#EE3C99] rounded-md p-3 md:p-4 font-bold">
          <p>{hours}h</p>
        </div>
        <div className="flex bg-[#14171D]  text-white border border-[#EE3C99] rounded-md p-3 md:p-4 font-bold">
          <p>{minutes}m</p>
        </div>
        <div className="flex bg-[#14171D]  text-white border border-[#EE3C99] rounded-md p-3 md:p-4 font-bold">
          <p>{seconds}s</p>
        </div>
      </div>
    );
  }, [remainingTime]);
  return (
    <div className="z-10 salecard bg-opacity-20 backdrop-blur-sm max-w-3xl w-full grid p-6 gap-4  grid-cols-1 justify-center items-center md:grid-cols-2 rounded-md">
      <div className="flex flex-col gap-2 ">
        <p className="text-[#EE3C99] font-semibold text-xl">
        RDZ Tokens presale starts in : {Math.floor(remainingTime / (24 * 60 * 60))} days
        </p>
        <p className="text-white text-sm">
          Ensure you are whitelisted to participate
        </p>
      </div>
      {formatTime}
    </div>
  );
};

export default Presale;