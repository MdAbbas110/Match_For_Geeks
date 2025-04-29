import { z } from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "../services/auth";

const loginFormSchema = z.object({
  email: z.string().email("Invalid Email ID"),
  password: z.string().min(4, "Choose a strong password"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]);
    if (user) {
      navigate("/");
    }
  }, [queryClient, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Success Data:", data);
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/");
      } else {
        setError("root", {
          type: "manual",
          message: data.message || "Login failed",
        });
      }
    },
    onError: () => {
      setError("root", {
        type: "manual",
        message: "Something went wrong, please try again.",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    mutate({ emailId: data.email, password: data.password });
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Find Your Match</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Existing User</h2>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="mt-4" htmlFor="email">
              Email ID
            </label>
            <label className="input validator my-2">
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="mail@site.com"
              />
            </label>
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <label htmlFor="password">Password</label>
            <label className="input validator my-2">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter a valid password",
                })}
              />
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Show root error message */}
            {errors.root && (
              <p className="text-red-600 mt-2">{errors.root.message}</p>
            )}

            <div className="mt-6">
              <button
                className="btn btn-primary btn-block"
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
