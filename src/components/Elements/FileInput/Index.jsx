import Label from "./Label";
import Input from "./Input";
import { forwardRef, useState } from "react";
import { isLoadingUploadAtom } from "../../../jotai/atoms";
import { useAtom } from "jotai";
import Spinner from "../Loading/Spinner";

const InputForm = forwardRef((props, ref) => {
  const { label, name, value, onChange, required } = props;

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useAtom(isLoadingUploadAtom);

  const handleChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onChange(e.target.files[0]);
    setFile(e.target.files[0].name);
    setIsLoading(false);
  };

  return (
    <div className="mb-6">
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-red-500 pl-2">*</span> : ""}
      </Label>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
            <svg
              className="w-8 h-4 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {isLoading ? <Spinner /> : file ? (
              file
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  pdf maksimum 1MB
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            name={name}
            className="hidden"
            onChange={handleChange}
            ref={ref}
          />
        </label>
      </div>
    </div>
  );
});

export default InputForm;
