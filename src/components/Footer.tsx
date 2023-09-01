const Footer = () => {
  return (
    <div>
      <footer className="bg-[#080808] md:p-10">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 gap-8 md:px-4 md:py-6 lg:py-8 p-10 md:grid-cols-4">
            <img src="/assets/randomz.png" alt="logo" className="md:hidden" width={140} />
            <div>
              <h2 className="mb-6 text-lg md:text-2xl font-bold text-white  ">
                Trading
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className=" hover:underline">
                    Ranking
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    NFT'S
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Token Explorer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg md:text-2xl font-bold text-white  ">
                Terms
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg md:text-2xl font-bold text-white  ">
                Contact us
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    +256-001-006
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Dapp@support.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg md:text-2xl font-bold text-white">
                Community
              </h2>
              <ul className="text-gray-500 font-medium flex gap-4">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    <img src="/assets/twitter.svg" width={40} height={40} alt="notfound" />
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    <img src="/assets/facebook.svg" width={35} height={40} alt="notfound" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col  px-4 ">
          <div className="flex  mb-10 flex-col gap-4 md:flex-row  bg-[#131313] p-3 my-10  md:max-w-xl text-white items-center justify-center rounded-md">
            <input
              type="email"
              name=""
              placeholder="Sign up for newsletter"
              id=""
              className="w-full h-full bg-[#131313] p-3 text-white"
            />
            <button className="bg-[#EE3C99] md:w-24 w-full rounded-md p-2">Join</button>
          </div>
          <p className="text-[#858181] md:text-left text-center mb-4">dappsoneplace. All Rights Reserved.2023</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
