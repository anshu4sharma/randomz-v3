const Partners = () => {
  return (
    <div className="bg-[#131313] md:p-20 p-10 md:grid md:overscroll-x-none md:overflow-hidden overflow-x-scroll flex flex-no-wrap justify-center items-center gap-10 md:grid-cols-4">
          <img
            src="/assets/cryptocom.svg"
            width={160}
            height={160}
            className="md:mr-10"
            alt="notfound"
          />
          <img
            src="/assets/techcrunch.svg"
            width={160}
            height={160}
            alt="notfound"
          />
          <img
            src="/assets/cointelegraph.svg"
            width={160}
            height={160}
            alt="notfound"
          />
          <img
            src="/assets/coindesk.svg"
            width={160}
            height={160}
            alt="notfound"
          />
    </div>
  );
};

export default Partners;
