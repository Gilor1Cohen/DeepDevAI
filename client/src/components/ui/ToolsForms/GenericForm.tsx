import { useForm } from "react-hook-form";
import Btn from "../btn/Btn";
import type { ToolsInputs } from "../../../types/tools.types";

import "./ToolsForms.css";
import type { FormUiProps } from "../../../types/ui.types";

export function GenericForm({
  placeholder,
  onSubmit,
  loading,
  error,
}: FormUiProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ToolsInputs>({ mode: "all" });

  return (
    <form id="GenericForm" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("input", { required: "Input is required" })}
        rows={10}
        placeholder={placeholder}
      />
      {errors.input && <p id="error-msg">{errors.input.message}</p>}

      {error && <p id="error-msg">{error}</p>}

      <Btn
        text={isSubmitting ? "Loading..." : "Submit"}
        type="submit"
        isDisabled={loading || !isValid || isSubmitting}
      />
    </form>
  );
}
