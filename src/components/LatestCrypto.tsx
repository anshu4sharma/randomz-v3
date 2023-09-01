import TopCrypto from './TopCryptoTable'
const LatestCrypto = () => {
  return (
    <div className='flex bg_gradient md:p-20 p-10 justify-center items-center flex-col gap-4'>
      <div className="flex flex-col text-white gap-4 text-left md:text-center mb-4">
        <h1 className='md:text-4xl text-2xl font-bold'>
        Get latest crypto prices
        </h1>
        <p className='text-base font-light'>
        Select your favorite social network and share our
          <br className='hidden md:block' />
          icons with your contacts or friends.
        </p>
      </div>
        <TopCrypto />
      </div>
  )
}

export default LatestCrypto