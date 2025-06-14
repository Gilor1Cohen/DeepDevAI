import { memo } from "react";
import type { FormInputProps } from "../../../types/forms.types";
import "./FormInput.css";

const FormInput = memo(function FormInput({
  type,
  placeholder,
  register,
  name,
  error,
  validation,
}: FormInputProps) {
  return (
    <div className="inputBox">
      <label htmlFor={name}>{name}:</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
});

export default FormInput;
