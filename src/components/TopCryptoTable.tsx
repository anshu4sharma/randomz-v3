import { Coinlist } from "./fakedata";
import axios from "axios";
import { useQuery } from "react-query";
const TopCrypto = () => {
    const fetchRate = async (
        coinFrom: string,
        coinTo: string,
        network: string = "ETH"
    ) => {
        const { data } = await axios.get(
            `https://exolix.com/api/v2/rate?coinFrom=${coinFrom}&coinTo=${coinTo}&networkTo=${network}&amount=11111&rateType=fixed`
        );
        return data;
    };
    const parallelRequest = async () => {
        try {
            const coinPromises = [
                fetchRate("BTC", "USDT"),
                fetchRate("ETH", "USDT"),
                fetchRate("BNB", "USDT"),
                fetchRate("XRP", "USDT"),
                fetchRate("ADA", "USDT"),
                fetchRate("DOGE", "USDT"),
                fetchRate("LTC", "USDT"),
            ];

            const coins = await Promise.allSettled(coinPromises);

            const updatedCoins = coins.map((result, index) => {
                if (result.status === "fulfilled") {
                    const { image, name, id } = Coinlist[index];
                    return { ...result.value, image, name, id };
                } else {
                    // Handle rejected promise (optional)
                    console.log(`Promise at index ${index} rejected: ${result.reason}`);
                    return null; // or any other fallback value
                }
            });

            return updatedCoins.filter((coin) => coin !== null) as any;
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isLoading } = useQuery("coins", parallelRequest);
    return (
        <>
            <div data-aos="fade-up" className="md:p-16 p-2 md:hidden cointable">
                <div className="">
                    <div className="flex relative rounded-3xl topcrypto overflow-x-scroll max-w-xs mt-4 justify-around flex-col md:flex-wrap md:flex-row">
                        <table className="w-full md:m-4 font-semibold text-sm text-left text-gray-500 ">
                            {!isLoading && (
                                <thead className="text-sm sm:text-base bg-transparent rounded-lg text-white p-6 ">
                                    <tr>
                                        <th className="p-6 whitespace-break-spaces">Name</th>
                                        <th className="p-6 whitespace-break-spaces">Last price(USD) </th>
                                        <th className="p-6 whitespace-break-spaces">24 Change</th>
                                        <th className="p-6 whitespace-break-spaces">Volume</th>
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {isLoading ? (
                                    <div
                                        role="status"
                                        className="w-full flex flex-col gap-4 my-4 space-y-4 divide-y rounded shadow animate-pulse divide-gray-700 border-gray-700"
                                    >
                                        {Array.from({ length: 8 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-3 items-center justify-between pt-4 p-4"
                                            >
                                                <div>
                                                    <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                                                    <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                                                </div>
                                                <div>
                                                    <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                                                    <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                                                </div>
                                                <div>
                                                    <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                                                    <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    data?.map((crypto: any) => (
                                        <tr
                                            key={crypto.id}
                                            className="bg-transparent text-white items-center "
                                        >
                                            <td className="px-6 py-4 flex items-center gap-4 w-full whitespace-break-spaces">
                                                <img
                                                    width={40}
                                                    height={50}
                                                    src={crypto.image}
                                                    alt={crypto.id}
                                                />
                                                <span className="whitespace-break-spaces">{crypto.name}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-break-spaces">USDT</td>
                                            <td className="px-6 py-4 whitespace-break-spaces">USDT</td>
                                            <td className="px-6 py-4 whitespace-break-spaces">
                                                {" "}
                                                {isLoading ? 0 : Number(crypto.rate).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* mobile table starts here */}
            <div className="p-4 mt-6 md:flex items-center hidden cointable shadow-sm shadow-[#172147]">
                <div className="flex relative rounded-3xl topcrypto overflow-x-auto mt-4 justify-around flex-col md:flex-wrap md:flex-row">
                    <div className="w-full font-semibold text-sm text-left text-gray-500 ">
                        <div className="text-sm sm:text-base text-center bg-transparent rounded-lg text-white  grid grid-cols-4">
                            <p className="px-6">Name</p>
                            <p className="px-6">Last price(USD) </p>
                            <p className="px-6">24 Change</p>
                            <p className="px-6 ">Volume</p>
                        </div>
                        <div className="">
                            {isLoading ? (
                                <div
                                    role="status"
                                    className="w-full p-4 space-y-4  divide-y rounded shadow animate-pulse divide-gray-700 md:p-6 border-gray-700"
                                >
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between pt-4"
                                        >
                                            <div>
                                                <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5  rounded-full bg-gray-700 w-12"></div>
                                            <div>
                                                <div className="h-2.5  rounded-full bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2  rounded-full bg-gray-700"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                data?.map((crypto: any,) => (
                                    <div
                                        key={crypto.id}
                                        className="bg-transparent text-center text-white grid grid-cols-4 hover:bg-[#172147] cursor-pointer items-center"
                                    >
                                        <div className="px-6 py-4 flex justify-center w-full">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    width={40}
                                                    height={50}
                                                    src={crypto.image}
                                                    alt={crypto.id}
                                                />
                                                <span>{crypto.name.split(" ")[0]}</span>
                                            </div>
                                        </div>
                                        <p className="px-6 py-4">
                                            {isLoading ? 0 : Number(crypto.rate).toFixed(3)} $
                                        </p>
                                        <p className="px-6 py-4 text-[#62DB92]">6%</p>
                                        <p className="px-6 py-4">43,65,100.00M</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopCrypto;
