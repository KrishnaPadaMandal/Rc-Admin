const Input = ({
  fieldName,
  fieldValue,
  placeHolder,
  setValue,
  fieldType,
  className = 3,
}) => {
  return (
    <div className={`sm:col-span-${className}`}>
      <label className="block text-sm font-medium leading-6 text-white-900">
        {fieldName}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          {/* <input
            type={fieldType}
            placeholder={`Enter ${placeHolder} here....`}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            onChange={(e) => setValue(e.target.value)}
            value={fieldValue}
          /> */}

          <input
            type={fieldType}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            // ref={ref}
            placeholder={`Enter ${placeHolder} here....`}
            onChange={(e) => setValue(e.target.value)}
            value={fieldValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
