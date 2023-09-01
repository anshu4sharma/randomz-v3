import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex justify-start md:p-20 p-10 z-10 items-center h-full">
      <div className="flex flex-col text-white z-10 h-full justify-center">
        <h1 className="md:text-6xl md:hidden inline md:leading-[100px] leading-[60px] text-3xl tracking-wide font-semibold md:font-bold">
          Decentralized
          <br />
          Governed By The Token Governed
          <br />
          By Community
        </h1>
        <h1 className="md:text-6xl md:inline hidden md:leading-[80px] leading-[60px] text-3xl tracking-wide font-semibold md:font-bold">
          Decentralized Token
          <br />
          Governed By The
          <br />
          Community
        </h1>
        <p className="md:text-xl mt-4 text-base max-w-[230px] md:max-w-none">
          Buy our decetralized token in private sale soon
        </p>
        <div className="flex gap-4 w-full mt-6 md:max-w-sm">
          <Link
            to="/signup"
            className="leading-4 justify-center flex items-center mt-4 p-3 text-center rounded-md bg-[#C0317C]  text-white font-bold w-full "
          >
            Sign up
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M1.02535 9.1599L0.967858 7.07387L15.9382 6.62193L11.1459 1.88773L12.5187 0.365594L19.7908 7.54951L12.9265 15.1602L11.4721 13.7234L15.9956 8.70797L1.02535 9.1599Z"
                  fill="white"
                />
              </svg>
            </span>
          </Link>
          <button className="leading-4 justify-center flex items-center mt-4 p-3 text-center rounded-md bg-[#C0317C]  text-white font-bold w-full">
            Whitepaper{" "}
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 19 22"
                fill="none"
              >
                <path
                  d="M19 18.2839L16 15.1442V17.2373H12V19.3305H16V21.4236L19 18.2839ZM9.8 21.4236H2C0.9 21.4236 0 20.4817 0 19.3305V2.58533C0 1.4341 0.9 0.492188 2 0.492188H10L16 6.77161V12.1091C15.7 12.0045 15.3 12.0045 15 12.0045C14.7 12.0045 14.3 12.0045 14 12.1091V7.81818H9V2.58533H2V19.3305H9.1C9.2 20.0631 9.5 20.7957 9.8 21.4236ZM4 10.9579H12V12.8417C11.9 12.9464 11.8 12.9464 11.7 13.051H4V10.9579ZM4 15.1442H9V17.2373H4V15.1442Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
