import Label from "./Label";
import Select from "./Select";
import { forwardRef } from "react";
const SelectForm = forwardRef((props, ref) => {
    const {label, name, options, onChange, required} = props
  return (
    <div className="mb-6">
      <Label htmlfor={name}>{label}</Label>
      <Select name={name} options={options} onChange={onChange} ref={ref}
        required={required}
      />
    </div>
  );
})

export default SelectForm;
