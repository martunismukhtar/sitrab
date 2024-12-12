import { forwardRef } from "react";

const Select = forwardRef((props, ref) => {
  const { options, placeholder="-- Pilih --", onChange, required=false, name, value } = props;  
  return (
    <select 
      onChange={onChange} 
      className="text-sm border rounded w-full py-2 px-3 placeholder-opacity-50 text-slate-700 bg-white"
      required={required?true:false}
      name={name}
      ref={ref}
      value={value}
      >
      <option value="">{placeholder}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.id}>
          {option.text}
        </option>
      ))}
    </select>
  );
});

export default Select;
