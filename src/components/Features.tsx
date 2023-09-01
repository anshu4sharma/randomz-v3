const Features = () => {
  return (
    <div className="flex bg_gradient md:p-20 p-10 justify-center overflow-hidden items-center flex-col gap-4">
      <div className="flex flex-col text-white gap-4 text-left md:text-center ">
        <h1 className="md:text-4xl text-2xl font-bold">
          Features of{" "}
          <span className="text-[#EE3C99] md:text-white">Randomz</span> Token
        </h1>
        <p className="text-base font-light">
          Select your favorite social network and share our
          <br className="hidden md:block" />
          icons with your contacts or friends.
        </p>
      </div>
      <div className="grid relative grid-cols-1 md:grid-cols-3 text-center mt-20 h-full py-10 ">
        <div
          className="absolute inset-0"
          style={{
            content: "",
            position: "absolute",
            zIndex: "0",
            borderRadius: "900px",
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(180deg, rgba(167, 36, 104, 0.80) 0%, rgba(14, 37, 157, 0.80) 100%)",
            filter: "blur(250px)",
          }}
        ></div>
        <div data-aos="fade-up-right" className="z-10 flex flex-col card1 text-white justify-center items-center max-w-xs h-full md:min-h-[400px] py-10 md:py-0">
          <img src="/assets/lock.svg" width={80} height={80} />
          <div className="flex p-8 flex-col">
            <p className="text-xl font-semibold text-center">
              Most Trusted <br />
              Security
            </p>
            <p className="text-base mt-6 font-light leading-[28px]">
              Select your favorite social network and share our new icons with
              your contacts or friends for better experience here with
            </p>
          </div>
        </div>
        <div data-aos="fade-up" className=" z-10 flex flex-col card2 text-white justify-center items-center max-w-xs h-full md:max-h-[460px] md:mt-[-60px] py-10 md:py-0">
          <img src="/assets/plane.svg" width={80} height={80} />
          <div className="flex p-8 flex-col">
            <p className="text-xl font-semibold text-center">
              Most Trusted <br />
              Security
            </p>
            <p className="text-base mt-6 font-light leading-[28px]">
              Select your favorite social network and share our new icons with
              your contacts or friends for better experience here with
            </p>
          </div>
        </div>
        <div data-aos="fade-up-left" className="z-10 flex flex-col card3 text-white justify-center items-center max-w-xs h-full md:min-h-[400px] py-10 md:py-0">
          <img src="/assets/lock.svg" width={80} height={80} />
          <div className="flex p-8 flex-col">
            <p className="text-xl font-semibold text-center">
              Most Trusted <br />
              Security
            </p>
            <p className="text-base mt-6 font-light leading-[28px]">
              Select your favorite social network and share our new icons with
              your contacts or friends for better experience here with
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
