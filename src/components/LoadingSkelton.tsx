const LoadingSkelton = () => {
  return (
    <div className="flex gap-4 w-full">
          <div
            role="status"
            className="w-full p-4 space-y-4 divide-y rounded animate-pulse divide-gray-700 md:p-6"
          >
            {[1, 2, 3, 4, 5].map((_index) => {
              return (
                <div
                  key={_index}
                  className="flex py-4 items-center justify-between"
                >
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
              );
            })}
          </div>
    </div>
  );
};

export default LoadingSkelton;
