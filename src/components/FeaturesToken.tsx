const FeaturesToken = () => {
  return (
    <div className="flex bg_gradient md:p-20 p-10 justify-center items-center flex-col gap-4">
      <div className="flex flex-col text-white gap-4 text-left md:text-center ">
        <h1 className="md:text-4xl text-2xl font-bold">
          Features of <span className="text-[#EE3C99]">Randomz</span> Token
        </h1>
        <p className="text-base font-light">
          Select your favorite social network and share our
          <br className="hidden md:block" />
          icons with your contacts or friends.
        </p>
      </div>
      <div className="flex-row max-w-4xl flex text-white gap-6 mt-10 justify-center flex-wrap md:flex-nowrap items-end w-full">
        <div className="flex bg-[#0D0D1B] h-full max-w-xs flex-col gap-4 items-start justify-center shadow-inner shadow-[#EE3C99] md:p-8 p-10 md:px-10 rounded-[38px]">
          <div className="flex justify-center items-center p-6  rounded-full  bg-[#1E1E1E]">
            <img src="/assets/red.svg" width={40} height={40} alt="notfound" />
          </div>
          <p className="font-light text-[#9E9E9E]">
            Select your favorite social network and share our new icons with
            your contacts or friends for better experience here with
          </p>
        </div>
        <div className="flex bg-[#0D0D1B] gap-4 flex-col items-start md:max-h-60 justify-center shadow-inner shadow-[#EE3C99] md:p-8 md:px-12 p-10 rounded-[38px]">
          <div className="flex justify-center items-center p-6  rounded-full  bg-[#1E1E1E]">
            <img src="/assets/red.svg" width={40} height={40} alt="notfound" />
          </div>
          <p className="font-light text-[#9E9E9E]">
            Select your favorite social network and share our new icons with
            your contacts or friends for better experience here with
          </p>
        </div>
      </div>
      <div className="flex-row max-w-5xl flex  text-white gap-6 mt-10 justify-center flex-wrap md:flex-nowrap items-start w-full">
        <div className="flex bg-[#0D0D1B] md:flex-row flex-col items-start  gap-4 md:items-center justify-center shadow-inner shadow-[#EE3C99] md:p-8 p-10 rounded-[38px]">
          <div className="flex justify-center items-center p-6  rounded-full  bg-[#1E1E1E]">
            <img src="/assets/blue.svg" width={40} height={40} alt="notfound" />
          </div>
          <p className="font-light text-[#9E9E9E]">
            Select your favorite social network and share our new icons with
            your contacts or friends for better experience here with
          </p>
        </div>
        <div className="flex bg-[#0D0D1B] h-full max-w-xs flex-col gap-4 items-start justify-center shadow-inner shadow-[#EE3C99] p-8 px-10 rounded-[38px]">
          <div className="flex justify-center items-center p-6  rounded-full  bg-[#1E1E1E]">
            <img src="/assets/yellow.svg" width={40} height={40} alt="notfound" />
          </div>
          <p className="font-light text-[#9E9E9E]">
            Select your favorite social network and share our new icons with
            your contacts or friends for better experience here with
          </p>
        </div>
      </div>
      <div className="flex bg-[#0D0D1B] md:mt-[-140px] h-full max-w-xs flex-col gap-4 items-start justify-center shadow-inner shadow-[#EE3C99] p-8 px-10 rounded-[38px]">
          <div className="flex justify-center items-center p-6  rounded-full  bg-[#1E1E1E]">
            <img src="/assets/yellow.svg" width={40} height={40} alt="notfound" />
          </div>
          <p className="font-light text-[#9E9E9E]">
            Select your favorite social network and share our new icons with
            your contacts or friends for better experience here with
          </p>
        </div>
    </div>
  );
};

export default FeaturesToken;
