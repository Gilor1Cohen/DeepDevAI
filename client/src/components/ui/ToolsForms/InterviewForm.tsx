import { useForm } from "react-hook-form";
import type { interviewQuestionsGeneratorInputs } from "../../../types/tools.types";
import Btn from "../btn/Btn";

import "./ToolsForms.css";
import PopularRoles from "../../../data/PopularRoles";
import type { FormUiProps } from "../../../types/ui.types";

export function InterviewForm({
  placeholder,
  onSubmit,
  loading,
  error,
}: FormUiProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<interviewQuestionsGeneratorInputs>({
    mode: "all",
  });

  return (
    <form id="InterviewForm" onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register("Topic", { required: "Topic is required" })}
        defaultValue=""
        disabled={loading}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {PopularRoles.map((role: string) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {errors.Topic && <p id="error-msg">{errors.Topic.message}</p>}
      {error && <p id="error-msg">{error}</p>}
      <Btn
        text={isSubmitting ? "Loading..." : "Submit"}
        type="submit"
        isDisabled={loading || !isValid || isSubmitting}
      />
    </form>
  );
}
