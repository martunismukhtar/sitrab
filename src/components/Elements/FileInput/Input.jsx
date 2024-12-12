import { forwardRef, useId } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name, value="", onChange, required=false } = props;
  // const ids = useId();
  return (
    <input
      type="file"
      className="text-sm border rounded w-full py-2 px-3 placeholder-opacity-50 text-slate-700 "
      placeholder={placeholder}
      name={name}
      id={name}
      onChange={onChange}
      ref={ref}
      value={value}
      required={required?true:false}
    />
  );
})

export default Input;
