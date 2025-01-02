const LoadingPanel = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] text-[#040404] p-2 rounded-md">
      <button
        type="button"
        className="pointer-events-none inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:outline-none focus:ring-0"
        disabled
      >
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span className="ml-1">Loading...</span>
      </button>
    </div>
  );
};

export default LoadingPanel;
