
import { forwardRef } from "react";

const Checkbox = forwardRef((props, ref) => {
    const {label, name, checked, placeholder, value, onChange} = props
    return (
      <div>
        <label>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
          />
          <span className="ml-2 text-sm">{label}</span>
          
        </label>
      </div>
    );
})

export default Checkbox;
