import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface FormInputs {
  name?: string;
  email: string;
  password: string;
}

export interface FormInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<FormInputs>;
  name: keyof FormInputs;
  error?: FieldError;
  validation: RegisterOptions<FormInputs, keyof FormInputs>;
}
