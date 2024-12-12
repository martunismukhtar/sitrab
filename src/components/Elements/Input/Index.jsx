import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
    const {label, name, type, placeholder, value, onChange, required} = props
  return (
    <div className="mb-6">
      <Label htmlfor={name}>
          {label} 
          {required ? <span className='text-red-500 pl-2'>*</span> : ""}          
      </Label>
      <Input type={type} value={value} name={name}         
        onChange={onChange} placeholder={placeholder} ref={ref}
        required={required}
        />
    </div>
  );
})

export default InputForm;
