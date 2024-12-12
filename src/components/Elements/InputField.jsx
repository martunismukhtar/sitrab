import React, {forwardRef} from "react";

const InputField = forwardRef((props, ref) => {
    const { type, placeholder="", name, onChange, className="", checked=false } = props;
    // w-full1
    return (
      <input
        type={type}
        className={`text-sm border rounded ${className} pl-[8px] py-2 placeholder-opacity-50 text-slate-700 ${className}`} 
        placeholder={placeholder}
        name={name}
        id={name}
        ref={ref}
        checked={checked}
        onChange={onChange}
      />
    );
  })

export default InputField;
