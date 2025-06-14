import { Link, useLocation, useNavigate } from "react-router-dom";
import Btn from "../../ui/btn/Btn";
import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput/FormInput";
import type { FormInputs } from "../../../types/forms.types";
import "./AuthPage.css";
import BackBtn from "../../ui/BackBtn/BackBtn";
import axios from "axios";
import type { AuthPageProps, AuthRes } from "../../../types/Auth.types";
import { useState } from "react";
import ErrorMessage from "../../ui/errorMessage/errorMessage";

export default function AuthPage({ setAuth }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const location = useLocation();

  const isSignUp: boolean = location.pathname === "/SignUp";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    mode: "all",
  });

  async function onSubmit(data: FormInputs): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post<AuthRes>(
        `http://localhost:5174/Auth/${isSignUp ? "SignUp" : "LogIn"}`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAuth(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);

      setError(error.response.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="AuthPage">
      <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>

      <BackBtn />

      <form id="AuthForm" onSubmit={handleSubmit(onSubmit)} noValidate>
        {isSignUp && (
          <FormInput
            type="text"
            placeholder="name"
            name="name"
            register={register}
            error={errors.name}
            validation={{
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must be at most 30 characters",
              },
            }}
          />
        )}

        <FormInput
          type="email"
          placeholder="email"
          name="email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
        />

        <FormInput
          type="password"
          placeholder="password"
          name="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 50,
              message: "Password must be at most 50 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
              message:
                "Password must include uppercase, lowercase and a number",
            },
          }}
        />

        <Btn
          text={
            isLoading
              ? "Loading"
              : location.pathname === "/SignUp"
              ? "Sign Up"
              : "Log In"
          }
          type={"submit"}
          isDisabled={!isValid || isSubmitting || isLoading}
        />

        {error && <ErrorMessage error={error} />}
      </form>

      {isSignUp ? (
        <p className="auth-switch">
          Already have an account?
          <Link className="auth-link" to="/LogIn">
            Log In
          </Link>
        </p>
      ) : (
        <p className="auth-switch">
          Don't have an account?
          <Link className="auth-link" to="/SignUp">
            Sign Up
          </Link>
        </p>
      )}
    </section>
  );
}
